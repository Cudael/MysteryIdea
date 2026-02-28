"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

export async function createConnectAccount() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");

  let stripeAccountId = user.stripeAccountId;

  if (!stripeAccountId) {
    const account = await stripe.accounts.create({
      type: "express",
      email: user.email,
      metadata: { userId: user.id },
    });
    stripeAccountId = account.id;

    await prisma.user.update({
      where: { id: user.id },
      data: { stripeAccountId },
    });
  }

  const accountLink = await stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: absoluteUrl("/creator/connect"),
    return_url: absoluteUrl("/creator/connect?success=1"),
    type: "account_onboarding",
  });

  redirect(accountLink.url);
}

export async function getConnectAccountStatus() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user?.stripeAccountId) return null;

  const account = await stripe.accounts.retrieve(user.stripeAccountId);
  return {
    id: account.id,
    chargesEnabled: account.charges_enabled,
    payoutsEnabled: account.payouts_enabled,
    detailsSubmitted: account.details_submitted,
  };
}

export async function createAccountLink() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user?.stripeAccountId) throw new Error("No Stripe account found");

  const accountLink = await stripe.accountLinks.create({
    account: user.stripeAccountId,
    refresh_url: absoluteUrl("/creator/connect"),
    return_url: absoluteUrl("/creator/connect?success=1"),
    type: "account_onboarding",
  });

  redirect(accountLink.url);
}
