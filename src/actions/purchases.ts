"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

export async function createCheckoutSession(ideaId: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");

  const idea = await prisma.idea.findUnique({
    where: { id: ideaId, published: true },
    include: { creator: true },
  });
  if (!idea) throw new Error("Idea not found");

  if (!idea.creator.stripeAccountId || !idea.creator.stripeOnboarded) {
    throw new Error("Creator payment account not set up");
  }

  const platformFeePercent =
    parseInt(process.env.STRIPE_PLATFORM_FEE_PERCENT ?? "15", 10) / 100;
  const platformFeeAmount = Math.round(idea.priceInCents * platformFeePercent);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: idea.currency,
          product_data: { name: idea.title },
          unit_amount: idea.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: absoluteUrl(`/ideas/${ideaId}?success=1`),
    cancel_url: absoluteUrl(`/ideas/${ideaId}`),
    metadata: { ideaId, buyerId: user.id },
    payment_intent_data: {
      application_fee_amount: platformFeeAmount,
      transfer_data: {
        destination: idea.creator.stripeAccountId,
      },
    },
  });

  // Create a pending purchase record
  await prisma.purchase.create({
    data: {
      buyerId: user.id,
      ideaId,
      amountInCents: idea.priceInCents,
      platformFeeInCents: platformFeeAmount,
      stripePaymentIntentId: session.payment_intent as string,
    },
  });

  if (session.url) {
    redirect(session.url);
  }
}

export async function verifyPurchase(ideaId: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return false;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return false;

  const purchase = await prisma.purchase.findUnique({
    where: {
      buyerId_ideaId: { buyerId: user.id, ideaId },
    },
  });

  return purchase?.status === "COMPLETED";
}

export async function getPurchasesByUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");

  return prisma.purchase.findMany({
    where: { buyerId: user.id, status: "COMPLETED" },
    include: {
      idea: {
        select: {
          id: true,
          title: true,
          teaserText: true,
          hiddenContent: true,
          creator: { select: { name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
