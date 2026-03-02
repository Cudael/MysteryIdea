import Link from "next/link";
import { ArrowRight, Lock, DollarSign, Zap, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/hero";
import { IdeaCard } from "@/components/idea-card";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

const HOW_IT_WORKS = [
  {
    icon: Lock,
    title: "Draft your insight",
    description: "Write your hidden idea, add a compelling teaser, and set your own price.",
  },
  {
    icon: DollarSign,
    title: "Set your terms",
    description: "Choose an exclusive (single buyer) or a multi-unlock pricing model.",
  },
  {
    icon: Zap,
    title: "Earn instantly",
    description: "Buyers unlock your content. Earnings flow directly to your Stripe wallet.",
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

      {/* Featured Ideas - Added a soft colored background & section tag */}
      <section className="relative py-24 bg-slate-50 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Top Marketplace Picks</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Featured Insights
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Discover the most highly-rated and frequently unlocked ideas from our top creators this week.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0 gap-2 h-11 border-primary/20 hover:bg-primary/5">
              <Link href="/ideas">
                View all ideas <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredIdeas.length === 0 ? (
              <div className="col-span-full rounded-2xl border-2 border-dashed border-border p-16 text-center bg-white">
                <p className="text-lg text-muted-foreground font-medium">
                  No ideas have been published yet. Be the first!
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

      {/* How It Works - Added visual connection lines & action hover */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Turn your thoughts into income
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A beautifully simple process to monetize your expertise without the friction of building a full product.
            </p>
          </div>
          
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {/* Desktop Connective Line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 -z-10"></div>

            {HOW_IT_WORKS.map(({ icon: Icon, title, description }, i) => (
              <div key={title} className="group relative text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white border-8 border-slate-50 shadow-xl transition-transform duration-300 group-hover:-translate-y-2 group-hover:border-primary/10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground max-w-xs mx-auto">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Deep contrasting color block */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        {/* Abstract creative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-slate-950 to-slate-950"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <ShieldCheck className="mx-auto mb-8 h-16 w-16 text-primary" />
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl mb-6">
              Bank-grade security, built in.
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-300 mb-12">
              Payments are processed instantly via Stripe Connect. You receive payouts directly to your bank account with a transparent 15% platform fee. No hidden costs.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 bg-primary hover:bg-primary/90 text-white border-0 text-base">
                <Link href="/sign-up">Start creating today</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-white text-base">
                <Link href="/ideas">Explore the market</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
