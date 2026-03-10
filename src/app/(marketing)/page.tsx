import Link from "next/link";
import {
  ArrowRight,
  Lock,
  DollarSign,
  Wallet,
  Code,
  Bot,
  Palette,
  Rocket,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { IdeaCard } from "@/features/ideas/components/idea-card";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

const CATEGORIES = [
  {
    icon: Rocket,
    name: "Startup Ideas",
    desc: "Business models, operator playbooks, and launch-ready opportunities.",
    slug: "startup-business-ideas",
  },
  {
    icon: Bot,
    name: "AI & Automation",
    desc: "Workflow systems, prompt stacks, and automation concepts.",
    slug: "ai-automation",
  },
  {
    icon: Code,
    name: "Software & Tech",
    desc: "Developer tools, SaaS angles, and technical strategy.",
    slug: "software-technology",
  },
  {
    icon: Palette,
    name: "Design & Creative",
    desc: "Creative direction, visual systems, and design-led ideas.",
    slug: "design-visual-arts",
  },
] as const;

const HOW_IT_WORKS = [
  {
    icon: Lock,
    title: "Browse teasers",
    description: "See enough context to judge the idea before paying for the full version.",
  },
  {
    icon: DollarSign,
    title: "Unlock what matters",
    description: "Pay for the ideas you want instead of subscribing to generic noise.",
  },
  {
    icon: Wallet,
    title: "Keep access",
    description: "Buyers unlock instantly while creators monetize their expertise directly.",
  },
] as const;

const CREATOR_POINTS = [
  "Monetize expertise without publishing everything for free",
  "Use pricing that reflects depth and scarcity",
  "Sell inside a marketplace built for discovery",
] as const;

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#4F46E5]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[30px] font-bold tracking-[-0.03em] text-[#0F172A] sm:text-[40px]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[17px] leading-8 text-[#475569]">{description}</p>
      )}
    </div>
  );
}

function StatItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-[120px]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94A3B8]">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A]">{value}</p>
    </div>
  );
}

function PreviewIdeaCard({
  title,
  category,
  price,
}: {
  title: string;
  category: string;
  price: string;
}) {
  return (
    <div className="rounded-[22px] border border-[#E2E8F0] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-full bg-[#EEF2FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4F46E5]">
          {category}
        </span>
        <span className="text-sm font-semibold text-[#0F172A]">{price}</span>
      </div>
      <h3 className="mt-4 text-[17px] font-semibold leading-7 text-[#0F172A]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#64748B]">Full idea unlocks after purchase.</p>
    </div>
  );
}

export default async function HomePage() {
  const { userId: clerkId } = await auth();

  const [featuredIdeas, bookmarkedIdeaIds, totalIdeas, totalPurchases, totalCreators] =
    await Promise.all([
      prisma.idea.findMany({
        where: { published: true },
        include: {
          creator: { select: { id: true, name: true, avatarUrl: true } },
          _count: { select: { purchases: true } },
        },
        orderBy: { purchases: { _count: "desc" } },
        take: 3,
      }),
      clerkId
        ? prisma.bookmark
            .findMany({
              where: { user: { clerkId } },
              select: { ideaId: true },
            })
            .then((bs) => new Set(bs.map((b) => b.ideaId)))
        : Promise.resolve(new Set<string>()),
      prisma.idea.count({ where: { published: true } }),
      prisma.purchase.count({ where: { status: "COMPLETED" } }),
      prisma.user.count({ where: { role: "CREATOR" } }),
    ]);

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A]">
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="container mx-auto max-w-[1400px] px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] px-4 py-2 text-sm font-medium text-[#4338CA]">
                <Sparkles className="h-4 w-4" />
                Curated creator marketplace
              </div>

              <h1 className="mt-6 text-[42px] font-bold tracking-[-0.05em] text-[#0F172A] sm:text-[58px] sm:leading-[1.02] lg:text-[68px]">
                Discover the ideas people don’t publish for free.
              </h1>

              <p className="mt-6 max-w-2xl text-[18px] leading-8 text-[#475569] sm:text-[20px]">
                MysteryMarket is a marketplace for high-signal strategies, concepts, and business insight. Browse what creators are willing to stand behind and unlock only what is worth paying for.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-[12px] bg-[#4F46E5] px-7 hover:bg-[#4338CA]">
                  <Link href="/ideas">
                    Explore the marketplace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-[12px] border-[#DCE3F1] bg-white px-7">
                  <Link href="/sign-up">Sell your ideas</Link>
                </Button>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-[#E2E8F0] pt-8">
                <StatItem label="Published ideas" value={totalIdeas.toLocaleString()} />
                <StatItem label="Successful unlocks" value={totalPurchases.toLocaleString()} />
                <StatItem label="Active creators" value={totalCreators.toLocaleString()} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <PreviewIdeaCard
                category="AI & Automation"
                title="A workflow agencies can sell to local businesses in under 14 days"
                price="$49"
              />
              <PreviewIdeaCard
                category="Startup Ideas"
                title="A niche marketplace model with built-in repeat demand"
                price="$79"
              />
              <div className="sm:col-span-2">
                <PreviewIdeaCard
                  category="Design & Creative"
                  title="A productized visual system offer for small B2B teams"
                  price="$39"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-20 lg:py-24">
        <div className="container mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {HOW_IT_WORKS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[22px] border border-[#E2E8F0] bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#EEF2FF] text-[#4F46E5]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#475569]">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E2E8F0] bg-white py-20 lg:py-24">
        <div className="container mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4F46E5]">
                Featured ideas
              </p>
              <h2 className="mt-3 text-[30px] font-bold tracking-[-0.03em] text-[#0F172A] sm:text-[40px]">
                Real listings from the marketplace
              </h2>
              <p className="mt-4 text-[17px] leading-8 text-[#475569]">
                Keep the homepage grounded in the product itself. The strongest proof is showing what buyers can actually unlock right now.
              </p>
            </div>

            <Button asChild variant="outline" className="rounded-[12px] border-[#DCE3F1] bg-white">
              <Link href="/ideas">
                Browse all ideas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {featuredIdeas.length === 0 ? (
            <div className="mt-10 rounded-[24px] border border-dashed border-[#DCE3F1] bg-[#F8FAFC] p-12 text-center text-[#64748B]">
              <p>New ideas are being curated. Check back soon.</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {featuredIdeas.map((idea) => (
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
                  initialBookmarked={bookmarkedIdeaIds.has(idea.id)}
                  isAuthenticated={!!clerkId}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-20 lg:py-24">
        <div className="container mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-8 sm:p-10">
              <SectionHeader
                eyebrow="Browse by category"
                title="Start with the area you know best"
                description="A clean category entry point makes the marketplace easier to scan and easier to trust."
                align="left"
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.slug}
                      href={`/ideas/category/${category.slug}`}
                      className="group rounded-[20px] border border-[#E2E8F0] bg-[#F8FAFC] p-5 transition-colors hover:bg-white"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#EEF2FF] text-[#4F46E5]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-[#0F172A]">{category.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#475569]">{category.desc}</p>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4F46E5]">For creators</p>
              <h3 className="mt-4 text-[30px] font-bold tracking-[-0.03em] text-[#0F172A]">
                Sell your best thinking in a cleaner format.
              </h3>
              <p className="mt-4 text-[17px] leading-8 text-[#475569]">
                MysteryMarket gives creators a more focused way to package expertise, price it clearly, and reach buyers who are already looking for useful ideas.
              </p>

              <div className="mt-8 space-y-4">
                {CREATOR_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[#4F46E5]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-[15px] leading-7 text-[#475569]">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-[12px] bg-[#4F46E5] hover:bg-[#4338CA]">
                  <Link href="/sign-up">Sell your ideas</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-[12px] border-[#DCE3F1] bg-white">
                  <Link href="/ideas">See live listings</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#E2E8F0] bg-white py-20">
        <div className="container mx-auto max-w-[900px] px-6 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4F46E5]">
            Get started
          </p>
          <h2 className="mt-4 text-[32px] font-bold tracking-[-0.03em] text-[#0F172A] sm:text-[42px]">
            Explore what’s worth unlocking.
          </h2>
          <p className="mt-4 text-[17px] leading-8 text-[#475569]">
            Browse the marketplace, discover ideas with real commercial framing, or start selling your own expertise.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-[12px] bg-[#4F46E5] px-7 hover:bg-[#4338CA]">
              <Link href="/ideas">Explore ideas</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-[12px] border-[#DCE3F1] bg-white px-7">
              <Link href="/sign-up">Become a creator</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}