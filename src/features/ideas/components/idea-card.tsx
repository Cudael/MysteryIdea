"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Lightbulb, Lock, Star, Unlock, Users, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/features/bookmarks/components/bookmark-button";
import { CATEGORY_META } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";
import type { IdeaCardProps } from "@/features/ideas/types";

function normalizeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return null;
}

export function IdeaCard({
  id,
  title,
  teaserText,
  teaserImageUrl,
  priceInCents,
  unlockType,
  category,
  creatorId,
  creatorName,
  creatorAvatarUrl,
  purchaseCount,
  reviewCount,
  averageRating,
  isOwner = false,
  isPurchased = false,
  initialBookmarked = false,
  isAuthenticated = false,
  isTrending = false,
  index,
}: IdeaCardProps & { index?: number }) {
  const [imageError, setImageError] = useState(false);

  const normalizedImageUrl = normalizeUrl(teaserImageUrl);
  const normalizedCreatorAvatarUrl = normalizeUrl(creatorAvatarUrl);

  const creatorInitials = (() => {
    const value = creatorName?.trim();
    if (!value) return "?";
    const parts = value.split(/\s+/).filter(Boolean);
    return parts
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  })();

  const hasImage = !!normalizedImageUrl && !imageError;
  const categorySlug = category ? CATEGORY_META[category]?.slug : null;

  const unlockBadgeClasses = cn(
    "flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm",
    unlockType === "EXCLUSIVE"
      ? "bg-violet-100 text-violet-700 border border-violet-200"
      : "bg-slate-100 text-slate-600 border border-slate-200"
  );

  return (
    <div
      className={cn(
        "group flex flex-col rounded-2xl border border-slate-200",
        "bg-white",
        "shadow-sm",
        "transition-all duration-300 hover:shadow-lg hover:shadow-violet-100/50 hover:border-violet-300 hover:-translate-y-1"
      )}
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        {hasImage ? (
          <>
            <Image
              src={normalizedImageUrl!}
              alt={title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
              <Lightbulb className="h-7 w-7 text-violet-500" />
            </div>
          </div>
        )}

        {/* Lock overlay for unpurchased ideas */}
        {!isPurchased && !isOwner && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
            style={{
              backdropFilter: "blur(8px) grayscale(30%)",
              background: "rgba(255, 255, 255, 0.45)",
            }}
          >
            <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-sm border border-violet-100">
              <Lock className="h-5 w-5 text-violet-500" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Preview Only
            </span>
          </div>
        )}

        {/* Badge strip */}
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
          {isTrending && (
            <span className="flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
              <Flame className="h-3 w-3" /> Trending
            </span>
          )}
          <span className={unlockBadgeClasses}>
            {unlockType === "EXCLUSIVE" ? (
              <><Zap className="h-3 w-3" /> Exclusive</>
            ) : (
              <>Multi</>
            )}
          </span>
          {category && (
            categorySlug ? (
              <Link
                href={`/ideas/category/${categorySlug}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center rounded-full bg-white/90 border border-slate-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-700 backdrop-blur-sm hover:bg-white hover:border-violet-300 hover:text-violet-700 transition-colors"
              >
                {category}
              </Link>
            ) : (
              <span className="flex items-center rounded-full bg-white/90 border border-slate-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-700 backdrop-blur-sm">
                {category}
              </span>
            )
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/ideas/${id}`}
            className="flex-1 font-bold text-base leading-snug line-clamp-2 text-zinc-900 hover:text-violet-600 transition-colors"
          >
            <span>{title}</span>
          </Link>
          {!isOwner && (
            <BookmarkButton
              ideaId={id}
              initialBookmarked={initialBookmarked}
              isAuthenticated={isAuthenticated}
            />
          )}
        </div>

        {/* Creator row */}
        {(creatorId || creatorName) && (
          <div className="mt-3 flex items-center justify-between">
            <Link
              href={creatorId ? `/creators/${creatorId}` : "#"}
              className="flex items-center gap-1.5 min-w-0"
              onClick={(e) => !creatorId && e.preventDefault()}
            >
              <Avatar className="h-5 w-5 shrink-0 ring-1 ring-slate-200">
                <AvatarImage src={normalizedCreatorAvatarUrl ?? undefined} />
                <AvatarFallback className="text-[9px] bg-violet-50 text-violet-600">{creatorInitials}</AvatarFallback>
              </Avatar>
              <span className="truncate text-xs text-slate-500 hover:text-violet-600 transition-colors">
                {creatorName ?? "Creator"}
              </span>
            </Link>
            {typeof purchaseCount === "number" && (
              <span className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
                <Users className="h-3.5 w-3.5" />
                {purchaseCount}
              </span>
            )}
          </div>
        )}

        {/* Teaser text */}
        {teaserText && (
          <p className="mt-2 text-sm text-slate-500 line-clamp-2">
            {teaserText}
          </p>
        )}

        {/* Rating row */}
        {typeof averageRating === "number" && typeof reviewCount === "number" && reviewCount > 0 && (
          <div className="mt-2 flex items-center gap-1">
            <span aria-label={`Rating: ${averageRating.toFixed(1)} out of 5 stars`}>
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            </span>
            <span className="text-xs font-medium text-zinc-700">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">
              ({reviewCount})
            </span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-slate-400">
              Price
            </span>
            <span className="text-xl font-bold text-zinc-900">
              {formatPrice(priceInCents)}
            </span>
          </div>
          {isOwner ? (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 px-4 text-xs rounded-xl border-slate-200 text-slate-700 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50"
            >
              <Link href={`/studio/ideas/${id}/edit`}>Edit</Link>
            </Button>
          ) : isPurchased ? (
            <Button
              asChild
              size="sm"
              className="h-9 px-4 text-xs rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              <Link href={`/ideas/${id}`}>                <Unlock className="mr-1.5 h-3.5 w-3.5" />
                Read
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              size="sm"
              className="h-9 px-4 text-xs rounded-xl bg-violet-600 hover:bg-violet-700 text-white"
            >
              <Link href={`/ideas/${id}`}>                <Unlock className="mr-1.5 h-3.5 w-3.5" />
                Unlock
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}