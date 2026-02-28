import type { Metadata } from "next";
import Link from "next/link";
import { PlusCircle, TrendingUp, DollarSign, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Creator Studio - MysteryIdea",
};

const STAT_CARDS = [
  { label: "Total Ideas", value: "0", icon: Eye },
  { label: "Total Earnings", value: "$0.00", icon: DollarSign },
  { label: "Total Unlocks", value: "0", icon: TrendingUp },
];

export default function CreatorPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Creator Studio
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your ideas and track earnings.
          </p>
        </div>
        <Button asChild>
          <Link href="/creator/ideas/new" className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Idea
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STAT_CARDS.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      {/* Ideas list placeholder */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Your Ideas
        </h2>
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            You haven&apos;t posted any ideas yet.
          </p>
          <Button asChild className="mt-4">
            <Link href="/creator/ideas/new">Post Your First Idea</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
