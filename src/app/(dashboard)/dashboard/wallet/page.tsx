import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Wallet2, ArrowDownCircle, ShoppingCart } from "lucide-react";
import { getWalletWithTransactions } from "@/features/wallet/actions";
import { WalletTransactions } from "@/features/wallet/components/wallet-transactions";
import { DepositDialog } from "@/features/wallet/components/deposit-dialog";
import { formatPrice } from "@/lib/utils";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "My Wallet - MysteryMarket",
};

export default async function BuyerWalletPage({
  searchParams,
}: {
  searchParams: Promise<{ deposit?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { deposit } = await searchParams;

  const { wallet, transactions } = await getWalletWithTransactions(50);

  // Compute totals from a single aggregation grouped by transaction type
  const typeTotals = await prisma.walletTransaction.groupBy({
    by: ["type"],
    where: { walletId: wallet.id },
    _sum: { amountInCents: true },
  });

  const getTotal = (type: string) =>
    typeTotals.find((t) => t.type === type)?._sum.amountInCents ?? 0;

  const totalDeposited = getTotal("DEPOSIT");
  const totalSpentInCents = getTotal("PURCHASE");

  return (
    <div className="mx-auto max-w-4xl pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D9DCE3] pb-6">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#1A1A1A]">My Wallet</h1>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#1A1A1A]/60">
            Deposit funds and pay for premium ideas without leaving the platform.
          </p>
        </div>
        <div className="shrink-0">
          <DepositDialog />
        </div>
      </div>

      {deposit === "success" && (
        <div className="rounded-[8px] border border-[#C8E6C9] bg-[#E8F5E9] p-4 shadow-sm">
          <p className="text-[14px] font-medium text-[#054F31] flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4CAF50] text-white text-xs">✓</span>
            Funds added successfully! Your balance has been updated.
          </p>
        </div>
      )}

      {/* Main Balance Card */}
      <div className="rounded-[12px] border border-[#D9DCE3] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="border-b border-[#D9DCE3] bg-[#F8F9FC] px-6 py-4 flex items-center gap-2">
          <Wallet2 className="h-5 w-5 text-[#3A5FCD]" />
          <h2 className="text-[16px] font-semibold text-[#1A1A1A]">Wallet Overview</h2>
        </div>
        
        <div className="p-6 md:p-8 space-y-8">
          <div>
            <p className="text-[14px] font-medium uppercase tracking-wider text-[#1A1A1A]/50">Available Balance</p>
            <p className="mt-2 text-5xl font-bold tracking-tight text-[#1A1A1A]">
              {formatPrice(wallet.balanceInCents)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-[10px] border border-[#D9DCE3] bg-[#F8F9FC] p-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#054F31] mb-2">
                <ArrowDownCircle className="h-4 w-4" />
                <span className="text-[12px] font-bold uppercase tracking-wider">
                  Total Deposited
                </span>
              </div>
              <p className="text-xl font-bold text-[#1A1A1A]">
                {formatPrice(totalDeposited)}
              </p>
            </div>
            
            <div className="rounded-[10px] border border-[#D9DCE3] bg-[#F8F9FC] p-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#D32F2F] mb-2">
                <ShoppingCart className="h-4 w-4" />
                <span className="text-[12px] font-bold uppercase tracking-wider">
                  Total Spent
                </span>
              </div>
              <p className="text-xl font-bold text-[#1A1A1A]">
                {formatPrice(totalSpentInCents)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="rounded-[12px] border border-[#D9DCE3] bg-[#FFFFFF] shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6">
        <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">Transaction History</h3>
        <WalletTransactions transactions={transactions} />
      </div>

    </div>
  );
}
