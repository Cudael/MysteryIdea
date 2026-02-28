import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "My Purchases - MysteryIdea",
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">My Purchases</h1>
      <p className="mt-2 text-muted-foreground">
        Ideas you have unlocked will appear here.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-8 text-center"
          >
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              No purchases yet
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
