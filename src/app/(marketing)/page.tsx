import Link from "next/link";
import { ArrowRight, Lock, DollarSign, Zap, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/hero";
import { IdeaCard } from "@/components/idea-card";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

const HOW_IT_WORKS = [
  {
    icon: Lock,
    title: "Post Your Idea",
    description:
      "Draft your hidden insight, add a compelling teaser, and set your own price.",
  },
  {
    icon: DollarSign,
    title: "Control Access",
    description:
      "Choose exclusive (single buyer) or multi-unlock pricing models.",
  },
  {
    icon: Zap,
    title: "Earn Instantly",
    description:
      "Buyers unlock instantly. Earnings flow directly to your connected Stripe wallet.",
  },
];

export default async function HomePage() {
  const featuredIdeas = await prisma.idea.findMany({
    where: { published: true },
    include: {
      creator: { select: { id: true, name: true, avatarUrl: true } },
      _count: { select: { purchases: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <>
      <Hero />

      {/* Featured Ideas */}
      <section className="border-t border-border bg-muted/20 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Featured Ideas
              </h2>
              <p className="mt-2 text-muted-foreground">
                Unlock high-value insights from top creators.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0 gap-2">
              <Link href="/ideas">
                Browse marketplace <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredIdeas.length === 0 ? (
              <div className="col-span-full rounded-lg border border-dashed border-border p-12 text-center">
                <p className="text-sm text-muted-foreground">
                  No ideas have been published yet. Check back soon.
                </p>
              </div>
            ) : (
              featuredIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  id={idea.id}
                  title={idea.title}
                  teaserText={idea.teaserText}
                  teaserImageUrl={idea.teaserImageUrl}
                  priceInCents={idea.priceInCents}
                  unlockType={idea.unlockType}
                  category={idea.category}
                  creatorId={idea.creator.id}
                  creatorName={idea.creator.name}
                  creatorAvatarUrl={idea.creator.avatarUrl}
                  purchaseCount={idea._count.purchases}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Monetize your expertise
            </h2>
            <p className="mt-4 text-muted-foreground">
              A streamlined platform designed to turn your valuable thoughts into passive income.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map(({ icon: Icon, title, description }, i) => (
              <div key={title} className="relative rounded-2xl border border-border bg-background p-8 shadow-sm">
                <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-medium text-foreground">
                  <span className="text-muted-foreground mr-2">{i + 1}.</span>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t border-border py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-zinc-50">
            <div className="px-6 py-16 sm:px-12 sm:py-20 text-center">
              <ShieldCheck className="mx-auto mb-6 h-12 w-12 text-zinc-400" />
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Secure by design
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                Payments are processed via Stripe Connect. Creators receive payouts directly with a transparent 15% platform fee. All data is encrypted and protected.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/sign-up">Start creating today</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-white">
                  <Link href="/ideas">Explore ideas</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
