import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Create Idea - MysteryIdea",
};

export default function NewIdeaPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">Create New Idea</h1>
      <p className="mt-2 text-muted-foreground">
        Share your hidden insight with the world — on your terms.
      </p>

      <form className="mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Give your idea a compelling title..."
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="teaserText">Teaser Text</Label>
          <Textarea
            id="teaserText"
            placeholder="What can buyers expect? (Don't reveal too much!)"
            rows={3}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hiddenContent">Hidden Content</Label>
          <Textarea
            id="hiddenContent"
            placeholder="Your full idea — only visible after purchase..."
            rows={8}
            disabled
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price (USD)</Label>
            <Input id="price" type="number" placeholder="9.99" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unlockType">Unlock Type</Label>
            <Input id="unlockType" placeholder="Multi / Exclusive" disabled />
          </div>
        </div>

        <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          Full idea creation form coming in Phase 2.
        </div>

        <Button type="submit" className="w-full" disabled>
          Publish Idea
        </Button>
      </form>
    </div>
  );
}
