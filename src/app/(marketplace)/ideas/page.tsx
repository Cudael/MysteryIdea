import type { Metadata } from "next";
import { IdeaCard } from "@/components/idea-card";

export const metadata: Metadata = {
  title: "Explore Ideas - MysteryIdea",
  description: "Browse and unlock premium ideas from top creators.",
};

const MOCK_IDEAS = [
  {
    id: "1",
    title: "The 10-Minute Morning Ritual That Doubled My Productivity",
    teaserText:
      "A simple but unconventional morning routine that top performers swear by.",
    teaserImageUrl: null,
    priceInCents: 999,
    unlockType: "MULTI" as const,
    category: "Productivity",
    creatorName: "Alex Chen",
    purchaseCount: 142,
  },
  {
    id: "2",
    title: "The Pricing Psychology Hack That Increased My SaaS MRR by 40%",
    teaserText:
      "One pricing page tweak that most founders overlook. Backed by behavioral economics.",
    teaserImageUrl: null,
    priceInCents: 2499,
    unlockType: "EXCLUSIVE" as const,
    category: "Business",
    creatorName: "Sarah Kim",
    purchaseCount: 1,
  },
  {
    id: "3",
    title: "My Secret Viral Content Framework for 0-to-100K Followers",
    teaserText:
      "The exact content structure and posting strategy I used to grow a niche audience.",
    teaserImageUrl: null,
    priceInCents: 1499,
    unlockType: "MULTI" as const,
    category: "Marketing",
    creatorName: "Jordan Lee",
    purchaseCount: 87,
  },
  {
    id: "4",
    title: "The Cold Email Template That Gets a 42% Reply Rate",
    teaserText:
      "A tested cold email framework built on principles most sales coaches won't tell you.",
    teaserImageUrl: null,
    priceInCents: 799,
    unlockType: "MULTI" as const,
    category: "Sales",
    creatorName: "Maya Patel",
    purchaseCount: 203,
  },
  {
    id: "5",
    title: "My Exact Investment Strategy for Early-Stage Startups",
    teaserText:
      "The decision framework I use as an angel investor. Only shared with my inner circle — until now.",
    teaserImageUrl: null,
    priceInCents: 4999,
    unlockType: "EXCLUSIVE" as const,
    category: "Investing",
    creatorName: "David Park",
    purchaseCount: 1,
  },
  {
    id: "6",
    title: "The SEO Tactic That Drove 300K Organic Visits in 90 Days",
    teaserText:
      "A counterintuitive SEO approach that most experts haven't caught on to yet.",
    teaserImageUrl: null,
    priceInCents: 1999,
    unlockType: "MULTI" as const,
    category: "Marketing",
    creatorName: "Lisa Wang",
    purchaseCount: 56,
  },
];

export default function IdeasPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Explore Ideas</h1>
        <p className="mt-2 text-muted-foreground">
          Discover and unlock premium ideas from top creators
        </p>
      </div>

      {/* Filter Placeholders */}
      <div className="mb-8 flex flex-wrap gap-3">
        {["All", "Productivity", "Business", "Marketing", "Sales", "Investing"].map(
          (cat) => (
            <button
              key={cat}
              className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {cat}
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_IDEAS.map((idea) => (
          <IdeaCard key={idea.id} {...idea} />
        ))}
      </div>
    </div>
  );
}
