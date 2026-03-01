import Link from "next/link";
import { ArrowRight, Lock, DollarSign, Zap } from "lucide-react";
import { Hero } from "@/components/hero";
import { IdeaCard } from "@/components/idea-card";
import { Button } from "@/components/ui/button";

const MOCK_IDEAS = [
  {
    id: "1",
    title: "The 10-Minute Morning Ritual That Doubled My Productivity",
    teaserText:
      "A simple but unconventional morning routine that top performers swear by — but rarely share publicly.",
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
      "The exact content structure and posting strategy I used to grow a niche audience in 6 months.",
    teaserImageUrl: null,
    priceInCents: 1499,
    unlockType: "MULTI" as const,
    category: "Marketing",
    creatorName: "Jordan Lee",
    purchaseCount: 87,
  },
];

const HOW_IT_WORKS = [
  {
    icon: Lock,
    step: "01",
    title: "Post Your Idea",
    description:
      "Creators write their hidden idea, add a teaser to spark curiosity, and set their price.",
  },
  {
    icon: DollarSign,
    step: "02",
    title: "Set Your Price",
    description:
      "Choose exclusive (one buyer only) or multi-unlock pricing. You control who gets access.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Profit",
    description:
      "Buyers unlock your idea instantly. Earnings are added to your wallet instantly. Withdraw anytime.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Featured Ideas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Featured Ideas
              </h2>
              <p className="mt-2 text-muted-foreground">
                Unlock insights from top creators
              </p>
            </div>
            <Button asChild variant="ghost" className="gap-1">
              <Link href="/ideas">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_IDEAS.map((idea) => (
              <IdeaCard key={idea.id} {...idea} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three simple steps to turn your ideas into income
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map(({ icon: Icon, step, title, description }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                  Step {step}
                </span>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-8 py-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Secure by Design
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Payments are processed securely via Stripe. Creators receive funds
              directly to their Stripe Connect account with a 15% platform fee.
              All transactions are encrypted and protected.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/sign-up">Start Creating Today</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/ideas">Explore Ideas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
