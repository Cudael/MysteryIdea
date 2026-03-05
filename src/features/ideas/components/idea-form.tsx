"use client";

import Link from "next/link";
import Image from "next/image";
import { Lock, Unlock, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/features/bookmarks/components/bookmark-button";
import { formatPrice } from "@/lib/utils";
import { CATEGORY_META } from "@/lib/constants";
import type { IdeaCardProps } from "@/features/ideas/types";

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
  isOwner = false,
  isPurchased = false,
  initialBookmarked = false,
  isAuthenticated = false,
}: IdeaCardProps) {
  const isLocked = !isOwner && !isPurchased;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
      
      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full bg-muted/30 border-b">
        {teaserImageUrl ? (
          <Image
            src={teaserImageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50 pattern-grid-lg">
            <Sparkles className="h-8 w-8 text-muted-foreground/20" />
          </div>
        )}

        {/* Lock Overlay (Only visible if the user hasn't purchased/doesn't own it) */}
        {isLocked && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/30 backdrop-blur-[4px]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background/95 shadow-lg ring-1 ring-border/50">
              <Lock className="h-6 w-6 text-foreground" strokeWidth={2} />
            </div>
            <span className="mt-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold tracking-wide text-foreground shadow-sm ring-1 ring-border/50 backdrop-blur-md">
              Locked Content
            </span>
          </div>
        )}

        {/* Unlocked Overlay (Subtle indication for owners/purchasers) */}
        {!isLocked && (
          <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-md bg-green-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
            <Unlock className="h-3.5 w-3.5" />
            {isOwner ? "Your Idea" : "Unlocked"}
          </div>
        )}

        {/* Category badge (Only show if locked, otherwise we show the Unlocked badge above) */}
        {category && isLocked && (
          <div className="absolute left-3 top-3 z-20">
            {CATEGORY_META[category]?.slug ? (
              <Link
                href={`/ideas/category/${CATEGORY_META[category].slug}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center rounded-md bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm ring-1 ring-border/50 hover:bg-muted transition-colors"
              >
                {category}
              </Link>
            ) : (
              <span className="inline-flex items-center rounded-md bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm ring-1 ring-border/50">
                {category}
              </span>
            )}
          </div>
        )}

        {/* Bookmark button */}
        {!isOwner && (
          <div className="absolute right-3 top-3 z-20">
            <BookmarkButton
              ideaId={id}
              initialBookmarked={initialBookmarked}
              isAuthenticated={isAuthenticated}
            />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span
            className={`inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              unlockType === "EXCLUSIVE"
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {unlockType === "EXCLUSIVE" ? "Exclusive" : "Multi-unlock"}
          </span>

          {purchaseCount !== undefined && purchaseCount > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {purchaseCount} {purchaseCount === 1 ? 'sale' : 'sales'}
            </span>
          )}
        </div>

        <h3 className="line-clamp-2 text-xl font-semibold leading-tight tracking-tight text-foreground">
          <Link href={`/ideas/${id}`} className="hover:underline focus:outline-none">
            {title}
          </Link>
        </h3>

        {teaserText && (
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {teaserText}
          </p>
        )}

        {/* Spacer to push footer to bottom */}
        <div className="flex-1" />

        {/* Footer Area */}
        <div className="mt-6 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Creator Profile & Price */}
          <div className="flex items-center justify-between sm:flex-col sm:items-start sm:justify-center gap-1">
            <span className="text-lg font-bold tracking-tight text-foreground">
              {formatPrice(priceInCents)}
            </span>
            
            {creatorName && (
              <div className="flex items-center gap-2">
                {creatorAvatarUrl ? (
                  <Image 
                    src={creatorAvatarUrl} 
                    alt={creatorName} 
                    width={18} 
                    height={18} 
                    className="rounded-full bg-muted object-cover ring-1 ring-border"
                  />
                ) : (
                  <div className="h-[18px] w-[18px] rounded-full bg-muted ring-1 ring-border" />
                )}
                {creatorId ? (
                  <Link
                    href={`/creators/${creatorId}`}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {creatorName}
                  </Link>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground">{creatorName}</span>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="w-full sm:w-auto">
            {isOwner ? (
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href={`/creator/ideas/${id}/edit`}>Edit Idea</Link>
              </Button>
            ) : isPurchased ? (
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white sm:w-auto">
                <Link href={`/ideas/${id}`}>Read Content</Link>
              </Button>
            ) : (
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/ideas/${id}`}>
                  Unlock Now
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
