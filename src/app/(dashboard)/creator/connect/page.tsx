import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Stripe Connect - MysteryIdea",
};

export default function ConnectPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">
        Connect Your Stripe Account
      </h1>
      <p className="mt-2 text-muted-foreground">
        Connect a Stripe account to receive payments from your ideas.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-card p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Stripe Connect Onboarding
          </h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            We use Stripe Connect to securely process payments and send your
            earnings directly to your bank account. A 15% platform fee applies
            to each sale.
          </p>

          <div className="mt-6 w-full space-y-3">
            <Button className="w-full gap-2" disabled>
              <ExternalLink className="h-4 w-4" />
              Connect with Stripe
            </Button>
            <p className="text-xs text-muted-foreground">
              Stripe Connect onboarding coming in Phase 2.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="/creator"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Creator Studio
        </Link>
      </div>
    </div>
  );
}
