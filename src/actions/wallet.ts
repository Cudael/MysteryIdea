"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getOrCreateWallet() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) throw new Error("User not found");

  let wallet = await prisma.wallet.findUnique({ where: { userId: user.id } });
  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: { userId: user.id },
    });
  }

  return wallet;
}

export async function getWalletWithTransactions(limit = 20) {
  const wallet = await getOrCreateWallet();

  const transactions = await prisma.walletTransaction.findMany({
    where: { walletId: wallet.id },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  const withdrawals = await prisma.withdrawalRequest.findMany({
    where: { walletId: wallet.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return { wallet, transactions, withdrawals };
}

export async function creditWallet(
  userId: string,
  amountInCents: number,
  description: string,
  referenceId?: string
) {
  const wallet = await prisma.wallet.upsert({
    where: { userId },
    create: { userId },
    update: {},
  });

  await prisma.$transaction([
    prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balanceInCents: { increment: amountInCents },
        totalEarnedInCents: { increment: amountInCents },
      },
    }),
    prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type: "EARNING",
        amountInCents,
        description,
        referenceId,
      },
    }),
  ]);
}

export async function debitWalletForRefund(
  userId: string,
  amountInCents: number,
  description: string,
  referenceId?: string
) {
  const wallet = await prisma.wallet.findUnique({ where: { userId } });
  if (!wallet) throw new Error("Wallet not found");

  await prisma.$transaction([
    prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balanceInCents: { decrement: amountInCents },
      },
    }),
    prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type: "REFUND_DEBIT",
        amountInCents,
        description,
        referenceId,
      },
    }),
  ]);
}

const MINIMUM_WITHDRAWAL_CENTS = 1000;

export async function requestWithdrawal(amountInCents: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) throw new Error("User not found");

  if (!user.stripeAccountId || !user.stripeOnboarded) {
    throw new Error(
      "Please connect your Stripe account before withdrawing. Go to Settings → Stripe Connect."
    );
  }

  if (amountInCents < MINIMUM_WITHDRAWAL_CENTS) {
    throw new Error(
      `Minimum withdrawal is $${(MINIMUM_WITHDRAWAL_CENTS / 100).toFixed(2)}`
    );
  }

  const wallet = await prisma.wallet.findUnique({ where: { userId: user.id } });
  if (!wallet) throw new Error("Wallet not found");

  if (wallet.balanceInCents < amountInCents) {
    throw new Error("Insufficient balance");
  }

  const pendingWithdrawal = await prisma.withdrawalRequest.findFirst({
    where: {
      walletId: wallet.id,
      status: { in: ["PENDING", "PROCESSING"] },
    },
  });
  if (pendingWithdrawal) {
    throw new Error("You already have a pending withdrawal request");
  }

  await prisma.$transaction([
    prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balanceInCents: { decrement: amountInCents },
        totalWithdrawnInCents: { increment: amountInCents },
      },
    }),
    prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type: "WITHDRAWAL",
        amountInCents,
        description: `Withdrawal request for $${(amountInCents / 100).toFixed(2)}`,
      },
    }),
    prisma.withdrawalRequest.create({
      data: {
        walletId: wallet.id,
        amountInCents,
      },
    }),
  ]);

  revalidatePath("/creator/wallet");
  revalidatePath("/creator");
}
