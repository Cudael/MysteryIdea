import Link from "next/link";
import { ArrowRight, Lock, DollarSign, Wallet, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/hero";
import { IdeaCard } from "@/components/idea-card";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

const HOW_IT_WORKS = [
  {
    icon: Lock,
    title: "Draft your insight",
    description: "Write your hidden idea, craft a compelling teaser, and choose your price point.",
  },
  {
    icon: DollarSign,
    title: "Set your terms",
    description: "Opt for an exclusive single-buyer model or allow multiple unlocks.",
  },
  {
    icon: Wallet,
    title: "Earn instantly",
    description: "Earnings are processed instantly and sent directly to your Stripe account.",
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

      {/* Featured Ideas - Pure White Background */}
      <section className="bg-[#FFFFFF] py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-[#D9DCE3] pb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">
                Featured Insights
              </h2>
              <p className="mt-2 text-[16px] leading-[1.6] text-[#1A1A1A]/70">
                Highly-rated ideas recently unlocked by the community.
              </p>
            </div>
            <Button asChild variant="ghost" className="shrink-0 gap-2">
              <Link href="/ideas">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredIdeas.length === 0 ? (
              <div className="col-span-full rounded-[12px] border border-[#D9DCE3] bg-[#F5F6FA] p-12 text-center">
                <p className="text-[16px] text-[#1A1A1A]/70">
                  No ideas have been published yet. Be the first to create one.
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

      {/* How It Works - Fog Grey Background */}
      <section className="bg-[#F5F6FA] py-24 border-t border-[#D9DCE3]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">
              Turn your expertise into income
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-[#1A1A1A]/70">
              A streamlined platform designed for professionals to monetize their insights without overhead.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-[12px] border border-[#D9DCE3] bg-[#FFFFFF] p-8 shadow-[0_4px_14px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#F5F6FA] border border-[#D9DCE3]">
                  <Icon className="h-5 w-5 text-[#3A5FCD]" />
                </div>
                <h3 className="mb-3 text-[18px] font-semibold text-[#1A1A1A]">
                  {title}
                </h3>
                <p className="text-[16px] leading-[1.6] text-[#1A1A1A]/70">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section - Pure White Background */}
      <section className="bg-[#FFFFFF] py-24 border-t border-[#D9DCE3]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#AEE5D8]/20">
              <ShieldCheck className="h-8 w-8 text-[#AEE5D8] drop-shadow-sm" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">
              Secure by design
            </h2>
            <p className="mx-auto mt-6 text-[18px] leading-[1.6] text-[#1A1A1A]/70">
              Payments are processed automatically via Stripe Connect. You receive payouts directly to your bank account with a transparent 15% platform fee.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/sign-up">Start creating today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
