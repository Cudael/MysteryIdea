import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const { ideaId, buyerId } = session.metadata ?? {};

      if (ideaId && buyerId && session.payment_intent) {
        await prisma.purchase.updateMany({
          where: {
            stripePaymentIntentId: session.payment_intent as string,
          },
          data: { status: "COMPLETED" },
        });
      }
      break;
    }

    case "account.updated": {
      const account = event.data.object;
      if (account.charges_enabled) {
        await prisma.user.updateMany({
          where: { stripeAccountId: account.id },
          data: { stripeOnboarded: true },
        });
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
