"use client";

import Link from "next/link";
import Image from "next/image";
import { Lock, Unlock, Users, Image as ImageIcon } from "lucide-react";
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
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      
      {/* 
        Image Header Area 
        Using a fixed height (h-48) guarantees the container won't collapse. 
        overflow-hidden ensures the frosted glass doesn't bleed out.
      */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-muted">
        {teaserImageUrl ? (
          <Image
            src={teaserImageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50">
            <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
          </div>
        )}

        {/* Lock Overlay for Unpurchased Ideas */}
        {isLocked && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 border border-border shadow-sm">
              <Lock className="h-5 w-5 text-foreground" strokeWidth={2.5} />
            </div>
            <span className="mt-2 rounded-full bg-background/90 border border-border px-3 py-1 text-xs font-semibold tracking-wide text-foreground shadow-sm">
              Locked Content
            </span>
          </div>
        )}

        {/* Top Left: Category Badge */}
        {category && (
          <div className="absolute left-3 top-3 z-20">
            {CATEGORY_META[category]?.slug ? (
              <Link
                href={`/ideas/category/${CATEGORY_META[category].slug}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center rounded-md bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm border border-border hover:bg-muted transition-colors"
              >
                {category}
              </Link>
            ) : (
              <span className="inline-flex items-center rounded-md bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm border border-border">
                {category}
              </span>
            )}
          </div>
        )}

        {/* Top Right: Bookmark Button */}
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
        
        {/* Badges Row */}
        <div className="mb-3 flex items-center justify-between gap-4">
          <span
            className={`inline-flex items-center rounded bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground ${
              unlockType === "EXCLUSIVE" && "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
            }`}
          >
            {unlockType === "EXCLUSIVE" ? "Exclusive" : "Multi-unlock"}
          </span>

          {purchaseCount !== undefined && purchaseCount > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {purchaseCount}
            </span>
          )}
        </div>

        {/* Title & Teaser */}
        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-foreground">
          <Link href={`/ideas/${id}`} className="hover:text-primary transition-colors focus:outline-none">
            {title}
          </Link>
        </h3>

        {teaserText && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {teaserText}
          </p>
        )}

        {/* Spacer to push footer to bottom */}
        <div className="flex-1" />

        {/* Footer: Price, Creator, and Action */}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-foreground">
              {formatPrice(priceInCents)}
            </span>
            {creatorName && (
              <div className="mt-0.5 flex items-center gap-1.5">
                {creatorId ? (
                  <Link
                    href={`/creators/${creatorId}`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    by {creatorName}
                  </Link>
                ) : (
                  <span className="text-xs text-muted-foreground">by {creatorName}</span>
                )}
              </div>
            )}
          </div>

          <div>
            {isOwner ? (
              <Button asChild variant="outline" size="sm">
                <Link href={`/creator/ideas/${id}/edit`}>Edit</Link>
              </Button>
            ) : isPurchased ? (
              <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-1.5">
                <Link href={`/ideas/${id}`}>
                  <Unlock className="h-3.5 w-3.5" /> Read
                </Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="gap-1.5">
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
