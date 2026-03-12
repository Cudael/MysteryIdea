"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Lock, Zap, Unlock } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { IdeaCardProps } from "@/features/ideas/types";

export function IdeaCard({
  id,
  title,
  teaserImageUrl,
  priceInCents,
  unlockType,
  category,
  creatorName,
  purchaseCount,
  isOwner = false,
  isPurchased = false,
  isTrending = false,
  index = 0, // Pass the array index from the parent map function for bento sizing
}: IdeaCardProps & { index?: number }) {
  const [imageError, setImageError] = useState(false);

  const lockedState = !isPurchased && !isOwner;
  const sizeClass = index % 5 === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1 row-span-1";

  return (
    <Link href={`/ideas/${id}`} className={`group relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.2)] flex flex-col ${sizeClass}`}>
      
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0 bg-zinc-950">
        {!imageError && teaserImageUrl ? (
          <Image 
            src={teaserImageUrl} 
            alt={title} 
            fill 
            className={`object-cover opacity-30 mix-blend-overlay transition-all duration-700 group-hover:scale-105 group-hover:opacity-50 ${lockedState ? "blur-sm group-hover:blur-[2px]" : ""}`}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
      </div>

      {/* Floating Badges */}
      <div className="absolute top-5 left-5 z-10 flex flex-wrap gap-2">
        {unlockType === "EXCLUSIVE" && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            <Zap size={12} fill="currentColor" /> Exclusive
          </span>
        )}
        {isTrending && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            <Flame size={12} fill="currentColor" /> Hot
          </span>
        )}
      </div>

      {/* Center Padlock Interaction */}
      {lockedState && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 group-hover:-translate-y-4">
          <div className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <Lock className="text-zinc-400 w-6 h-6" />
          </div>
          <p className="mt-3 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">Classified</p>
        </div>
      )}

      {/* Content Area - Slides up on hover */}
      <div className="relative z-20 flex flex-col justify-end h-full p-6 mt-auto">
        <div className={`transform transition-all duration-500 ease-out ${lockedState ? "translate-y-6 group-hover:translate-y-0" : ""}`}>
          <p className="text-[11px] font-semibold text-violet-400 uppercase tracking-widest mb-2">{category}</p>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 leading-tight">{title}</h3>
          
          <div className={`flex items-center justify-between mt-6 transition-all duration-500 delay-100 ${lockedState ? "opacity-0 group-hover:opacity-100" : ""}`}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-400">By @{creatorName?.split(" ")[0] || "Creator"}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-white">{formatPrice(priceInCents)}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                {lockedState ? <Unlock className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
