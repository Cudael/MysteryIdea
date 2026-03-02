"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { AlertCircle } from "lucide-react";

const ideaFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  teaserText: z.string().max(500).optional(),
  teaserImageUrl: z.string().url().optional().or(z.literal("")),
  hiddenContent: z
    .string()
    .min(10, "Hidden content must be at least 10 characters"),
  priceInCents: z.number().int().min(99, "Minimum price is $0.99").max(100000),
  unlockType: z.enum(["EXCLUSIVE", "MULTI"]),
  maxUnlocks: z.number().int().min(1).optional().nullable(),
  category: z.string().max(50).optional(),
  tags: z.array(z.string()).max(10).optional(),
});

export type IdeaFormData = z.infer<typeof ideaFormSchema>;

interface IdeaFormProps {
  initialData?: Partial<IdeaFormData>;
  onSubmit: (data: IdeaFormData) => Promise<unknown>;
  submitLabel?: string;
}

export function IdeaForm({
  initialData,
  onSubmit,
  submitLabel = "Publish Idea",
}: IdeaFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [teaserText, setTeaserText] = useState(initialData?.teaserText ?? "");
  const [teaserImageUrl, setTeaserImageUrl] = useState(
    initialData?.teaserImageUrl ?? ""
  );
  const [hiddenContent, setHiddenContent] = useState(
    initialData?.hiddenContent ?? ""
  );
  const [priceStr, setPriceStr] = useState(
    initialData?.priceInCents ? (initialData.priceInCents / 100).toFixed(2) : ""
  );
  const [unlockType, setUnlockType] = useState<"EXCLUSIVE" | "MULTI">(
    initialData?.unlockType ?? "MULTI"
  );
  const [maxUnlocks, setMaxUnlocks] = useState(
    initialData?.maxUnlocks?.toString() ?? ""
  );
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [tagsStr, setTagsStr] = useState(
    initialData?.tags?.join(", ") ?? ""
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const priceInCents = Math.round(parseFloat(priceStr) * 100);
      const tags = tagsStr
        ? tagsStr
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      const data = ideaFormSchema.parse({
        title,
        teaserText: teaserText || undefined,
        teaserImageUrl: teaserImageUrl || undefined,
        hiddenContent,
        priceInCents,
        unlockType,
        maxUnlocks:
          unlockType === "MULTI" && maxUnlocks
            ? parseInt(maxUnlocks)
            : null,
        category: category || undefined,
        tags,
      });

      await onSubmit(data);
      toast.success(submitLabel === "Publish Idea" ? "Idea published!" : "Idea updated!");
      router.push("/creator");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const msg = err.errors[0]?.message ?? "Validation error";
        setError(msg);
        toast.error(msg);
      } else if (err instanceof Error && err.message === "STRIPE_NOT_CONNECTED") {
        const msg = "Please connect your Stripe account before creating ideas.";
        setError(msg);
        toast.error(msg, {
          action: {
            label: "Connect Stripe",
            onClick: () => router.push("/creator/connect"),
          },
        });
      } else if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError("Something went wrong");
        toast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const isStripeError = error === "Please connect your Stripe account before creating ideas.";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {isStripeError ? (
        <div className="flex items-center gap-3 rounded-[8px] border border-[#E8C26A]/30 bg-[#E8C26A]/10 p-4 text-[14px] text-[#1A1A1A]">
          <AlertCircle className="h-5 w-5 text-[#E8C26A]" />
          <span>
            {error}{" "}
            <Link href="/creator/connect" className="font-semibold text-[#3A5FCD] hover:underline ml-1">
              Set up Stripe Connect →
            </Link>
          </span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 rounded-[8px] border border-red-200 bg-red-50 p-4 text-[14px] text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      ) : null}

      <div className="space-y-6 border-b border-[#D9DCE3] pb-8">
        <h2 className="text-xl font-bold text-[#1A1A1A]">Basic Information</h2>
        
        <div className="space-y-2">
          <Label htmlFor="title" className="text-[#1A1A1A] font-semibold">Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your idea a compelling, clear title..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="teaserText" className="text-[#1A1A1A] font-semibold">Teaser Text</Label>
          <Textarea
            id="teaserText"
            value={teaserText}
            onChange={(e) => setTeaserText(e.target.value)}
            placeholder="What will buyers learn? (Hook them in without revealing the secret)"
            rows={3}
          />
          <p className="text-[13px] text-[#1A1A1A]/60">
            Visible to everyone on the marketplace. Max 500 characters.
          </p>
        </div>

        <div className="space-y-3">
          <Label className="text-[#1A1A1A] font-semibold">Teaser Image</Label>
          <div className="flex items-start gap-6">
            {teaserImageUrl ? (
              <div className="relative h-32 w-48 overflow-hidden rounded-[8px] border border-[#D9DCE3]">
                <Image
                  src={teaserImageUrl}
                  alt="Teaser preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-32 w-48 items-center justify-center rounded-[8px] border border-dashed border-[#D9DCE3] bg-[#F8F9FC]">
                <span className="text-[13px] text-[#1A1A1A]/40">No image selected</span>
              </div>
            )}
            <div className="flex-1">
              <UploadButton
                endpoint="teaserImageUploader"
                onClientUploadComplete={(res) => {
                  if (res[0]?.url) setTeaserImageUrl(res[0].url);
                }}
                onUploadError={(error: Error) => setError(error.message)}
                appearance={{
                  button: "bg-[#FFFFFF] border border-[#D9DCE3] text-[#1A1A1A] hover:bg-[#F5F6FA] text-sm h-10 px-4",
                  allowedContent: "text-[#1A1A1A]/60 text-xs mt-2"
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 border-b border-[#D9DCE3] pb-8">
        <div>
          <h2 className="text-xl font-bold text-[#1A1A1A]">The Hidden Insight</h2>
          <p className="mt-1 text-[14px] text-[#1A1A1A]/60">This is what buyers are paying for. Make it incredibly valuable.</p>
        </div>
        
        <div className="space-y-2">
          <Textarea
            id="hiddenContent"
            value={hiddenContent}
            onChange={(e) => setHiddenContent(e.target.value)}
            placeholder="Write your exclusive strategy, framework, snippet, or knowledge here..."
            rows={12}
            required
            className="font-mono text-[14px]"
          />
        </div>
      </div>

      <div className="space-y-6 pb-4">
        <h2 className="text-xl font-bold text-[#1A1A1A]">Pricing & Discovery</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-[#1A1A1A] font-semibold">Price (USD) *</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-[#1A1A1A]/50">$</span>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0.99"
                value={priceStr}
                onChange={(e) => setPriceStr(e.target.value)}
                placeholder="9.99"
                className="pl-8"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="unlockType" className="text-[#1A1A1A] font-semibold">Access Model *</Label>
            <select
              id="unlockType"
              value={unlockType}
              onChange={(e) =>
                setUnlockType(e.target.value as "EXCLUSIVE" | "MULTI")
              }
              className="flex h-11 w-full rounded-[8px] border border-[#D9DCE3] bg-[#F8F9FC] px-4 py-2 text-[15px] font-medium text-[#1A1A1A] outline-none transition-all focus:border-[#3A5FCD] focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#3A5FCD]/20"
            >
              <option value="MULTI">Multi-unlock (Unlimited sales)</option>
              <option value="EXCLUSIVE">Exclusive (Sells only once)</option>
            </select>
          </div>

          {unlockType === "MULTI" && (
            <div className="space-y-2">
              <Label htmlFor="maxUnlocks" className="text-[#1A1A1A] font-semibold">Sales Limit</Label>
              <Input
                id="maxUnlocks"
                type="number"
                min="1"
                value={maxUnlocks}
                onChange={(e) => setMaxUnlocks(e.target.value)}
                placeholder="Unlimited"
              />
              <p className="text-[13px] text-[#1A1A1A]/60">
                Leave empty if you don't want to limit total sales.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-[#1A1A1A] font-semibold">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. SaaS Growth"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-[#1A1A1A] font-semibold">Tags</Label>
            <Input
              id="tags"
              value={tagsStr}
              onChange={(e) => setTagsStr(e.target.value)}
              placeholder="marketing, seo, conversion"
            />
            <p className="text-[13px] text-[#1A1A1A]/60">
              Separate with commas.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-4">
        <Button type="submit" size="lg" className="w-full sm:flex-1 h-12 text-[16px]" disabled={isSubmitting}>
          {isSubmitting ? "Publishing..." : submitLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full sm:w-auto h-12 text-[16px]"
          onClick={() => router.push("/creator")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
