import Link from "next/link";
import { ArrowRight, LockOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F9FC]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(58,95,205,0.10),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(58,95,205,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(58,95,205,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container relative mx-auto max-w-[1400px] px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9DCE3] bg-white px-4 py-2 text-sm font-medium text-[#1A1A1A]/70 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
              <Sparkles className="h-4 w-4 text-[#3A5FCD]" />
              Premium Marketplace
            </div>

            <h1 className="mt-6 text-[42px] font-bold tracking-[-0.03em] text-[#111827] sm:text-[56px] sm:leading-[1.02]">
              Buy and sell{" "}
              <span className="text-[#3A5FCD]">high-value ideas</span>
            </h1>

            <p className="mt-6 max-w-2xl text-[18px] leading-8 text-[#1A1A1A]/68 sm:text-[20px]">
              Unlock exclusive business insights or monetize your own expertise in a secure, premium marketplace designed for forward-thinkers.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-[10px] bg-[#3A5FCD] px-7 text-[15px] font-semibold hover:bg-[#2D4FB0]">
                <Link href="/ideas">
                  Explore ideas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-[10px] border-[#D9DCE3] bg-white px-7 text-[15px] font-semibold text-[#1A1A1A] hover:bg-[#F5F6FA]">
                <Link href="/sign-up">Start selling</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 -z-10 h-64 w-64 rounded-full bg-[#3A5FCD]/10 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 -z-10 h-64 w-64 rounded-full bg-[#E8C26A]/10 blur-3xl" />

            <div className="rounded-[24px] border border-[#D9DCE3] border-t-[6px] border-t-[#3A5FCD] bg-white p-6 shadow-[0_24px_80px_rgba(17,24,39,0.08)]">
              <div className="overflow-hidden rounded-[18px] border border-[#E6EAF2] bg-[#F8F9FC]">
                <div className="relative h-48 w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdGX7NC4IklMBCw7h7LW8-dmEpZyIWK6DANo1n0nVZqIn40XG6VFlxTIGLeBcFshs4X3j8_kuk-My0HY_F7kfvjxZ9yU3yzJyR_MIkp-LAhYMMJBT58sxqyBeCKFZMMZEuVQfggvp5WZ6POU7_sinx1Su3LO5iSuI_ZwrcXsHwmEgwdxxzQN-YYYOFouC841X6V3nT3plRG9oKrLdLYxpcod8w07Ahub-z2Wi2Tgu6WXwed5yMKPm7N1zHBRC-hPtLSPP_RcpB22c"
                    alt="The Next-Gen Micro-SaaS for Remote Teams"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-[#3A5FCD]/10 px-3 py-1 text-xs font-semibold text-[#3A5FCD] backdrop-blur-sm">
                    Exclusive
                  </span>
                </div>

                <div className="p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3A5FCD]/10 text-sm font-bold text-[#3A5FCD]">
                      E
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">Elena R.</p>
                      <p className="text-xs text-[#1A1A1A]/45">Top Creator</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-[#111827]">
                    The Next-Gen Micro-SaaS for Remote Teams
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#1A1A1A]/65">
                    A fully validated concept with initial wireframes and market research for a unique remote collaboration tool.
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#E6EAF2] pt-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#1A1A1A]/40">Unlock Price</p>
                      <p className="mt-1 text-lg font-semibold text-[#111827]">$2,500</p>
                    </div>
                    <Button size="sm" className="rounded-[8px] bg-[#3A5FCD] text-[13px] font-semibold hover:bg-[#2D4FB0]">
                      <LockOpen className="mr-1.5 h-3.5 w-3.5" />
                      Unlock Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
