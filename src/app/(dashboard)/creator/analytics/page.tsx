import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { BarChart3, Star, DollarSign, ShoppingCart, Lightbulb, MessageSquare } from "lucide-react";
import { RevenueChart } from "@/features/analytics/components/revenue-chart";
import { TopIdeasTable } from "@/features/analytics/components/top-ideas-table";
import { RecentSales } from "@/features/analytics/components/recent-sales";
import { PayoutInfo } from "@/features/analytics/components/payout-info";
import { getCreatorAnalytics } from "@/features/analytics/actions";
import { getConnectAccountStatus } from "@/features/stripe/actions";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Analytics - MysteryIdea",
};

export default async function CreatorAnalyticsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const [analytics, connectStatus] = await Promise.all([
    getCreatorAnalytics(),
    getConnectAccountStatus(),
  ]);

  const { stats, revenueByMonth, topIdeas, recentSales } = analytics;

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 space-y-8">
      
      {/* Header */}
      <div className="flex items-center gap-3.5 border-b border-[#D9DCE3] pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#3A5FCD] shadow-[0_2px_8px_rgba(58,95,205,0.3)]">
          <BarChart3 className="h-6 w-6 text-[#FFFFFF]" />
        </div>
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#1A1A1A]">Creator Analytics</h1>
          <p className="text-[15px] text-[#1A1A1A]/60">Your overall performance and revenue at a glance.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Total Revenue", value: formatPrice(stats.totalRevenue), sub: "Net earnings", icon: DollarSign, color: "text-[#054F31]", bg: "bg-[#E8F5E9]" },
          { label: "Total Sales", value: stats.totalSales, sub: "Purchases", icon: ShoppingCart, color: "text-[#3A5FCD]", bg: "bg-[#F0F4FF]" },
          { label: "Avg Rating", value: stats.averageRating > 0 ? stats.averageRating.toFixed(1) : "—", sub: "Out of 5.0", icon: Star, color: "text-[#B8860B]", bg: "bg-[#FFF8E1]" },
          { label: "Total Reviews", value: stats.totalReviews, sub: "Engagement", icon: MessageSquare, color: "text-[#6D7BE0]", bg: "bg-[#F5F6FA]" },
          { label: "Active Ideas", value: stats.activeIdeas, sub: "Published", icon: Lightbulb, color: "text-[#E8C26A]", bg: "bg-[#FFFDE7]" },
          { label: "Total Ideas", value: stats.totalIdeas, sub: "All time", icon: Lightbulb, color: "text-[#1A1A1A]/60", bg: "bg-[#F8F9FC]" },
        ].map((stat, i) => (
          <div key={i} className="rounded-[12px] border border-[#D9DCE3] bg-[#FFFFFF] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-bold uppercase tracking-wider text-[#1A1A1A]/50">{stat.label}</p>
              <div className={`h-6 w-6 rounded-full flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</p>
              <p className="mt-0.5 text-[12px] font-medium text-[#1A1A1A]/40">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart Wrapper */}
      <div className="rounded-[12px] border border-[#D9DCE3] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6">
        <h2 className="text-[16px] font-semibold text-[#1A1A1A] mb-6">Revenue Over Time</h2>
        <div className="h-[300px]">
          <RevenueChart data={revenueByMonth} />
        </div>
      </div>

      {/* Top Ideas + Recent Sales */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[12px] border border-[#D9DCE3] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
          <div className="border-b border-[#D9DCE3] bg-[#F8F9FC] px-6 py-4">
            <h2 className="text-[16px] font-semibold text-[#1A1A1A]">Top Performing Ideas</h2>
          </div>
          <div className="p-0 sm:p-6 flex-1">
            <TopIdeasTable ideas={topIdeas} />
          </div>
        </div>

        <div className="rounded-[12px] border border-[#D9DCE3] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
          <div className="border-b border-[#D9DCE3] bg-[#F8F9FC] px-6 py-4">
            <h2 className="text-[16px] font-semibold text-[#1A1A1A]">Recent Sales</h2>
          </div>
          <div className="p-0 sm:p-6 flex-1">
            <RecentSales sales={recentSales} />
          </div>
        </div>
      </div>

      {/* Payout Info Wrapper */}
      <div className="rounded-[12px] border border-[#D9DCE3] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="border-b border-[#D9DCE3] bg-[#F8F9FC] px-6 py-4">
          <h2 className="text-[16px] font-semibold text-[#1A1A1A]">Payout Settings</h2>
        </div>
        <div className="p-6">
          <PayoutInfo
            connected={connectStatus.connected}
            onboarded={connectStatus.onboarded}
          />
        </div>
      </div>
      
    </div>
  );
}
