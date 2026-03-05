"use client";

import Link from "next/link";
import Image from "next/image";
import { Lock, Users, ArrowRight } from "lucide-react";
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
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
      
      {/* Image / Subtle Placeholder */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b bg-muted/50">
        {teaserImageUrl ? (
          <Image
            src={teaserImageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/30">
            <Lock className="h-8 w-8 text-muted-foreground/30" strokeWidth={1.5} />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Category badge */}
        {category && (
          <div className="absolute left-3 top-3 z-20">
            {CATEGORY_META[category]?.slug ? (
              <Link
                href={`/ideas/category/${CATEGORY_META[category].slug}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center rounded-md bg-background/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur transition-colors hover:text-primary"
              >
                {category}
              </Link>
            ) : (
              <span className="inline-flex items-center rounded-md bg-background/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
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

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
          <Link href={`/ideas/${id}`} className="focus:outline-none">
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {title}
          </Link>
        </h3>

        {teaserText && (
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {teaserText}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase ${
              unlockType === "EXCLUSIVE"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {unlockType === "EXCLUSIVE" ? "Exclusive" : "Multi-unlock"}
          </span>
          {purchaseCount !== undefined && purchaseCount > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Users className="h-3 w-3" />
              {purchaseCount} {purchaseCount === 1 ? 'unlock' : 'unlocks'}
            </span>
          )}
        </div>

        {/* Spacer to push footer to bottom */}
        <div className="flex-1" />

        <div className="mt-5 flex items-center justify-between border-t pt-4">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground">
              {formatPrice(priceInCents)}
            </span>
            {creatorName && (
              <div className="mt-1 flex items-center gap-2 relative z-20">
                {creatorAvatarUrl ? (
                  <Image 
                    src={creatorAvatarUrl} 
                    alt={creatorName} 
                    width={20} 
                    height={20} 
                    className="rounded-full bg-muted object-cover border border-border"
                  />
                ) : (
                  <div className="h-5 w-5 rounded-full bg-muted border border-border" />
                )}
                {creatorId ? (
                  <Link
                    href={`/creators/${creatorId}`}
                    className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {creatorName}
                  </Link>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground">{creatorName}</span>
                )}
              </div>
            )}
          </div>

          <div className="relative z-20">
            {isOwner ? (
              <Button asChild variant="outline" size="sm" className="h-9">
                <Link href={`/creator/ideas/${id}/edit`}>Edit</Link>
              </Button>
            ) : isPurchased ? (
              <Button asChild variant="secondary" size="sm" className="h-9 gap-1.5">
                <Link href={`/ideas/${id}`}>
                  Read Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="h-9 gap-1.5 shadow-sm">
                <Link href={`/ideas/${id}`}>
                  <Lock className="h-3.5 w-3.5" />
                  Unlock
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
