import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Edit Idea - MysteryIdea",
};

export default function EditIdeaPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">Edit Idea</h1>
      <p className="mt-2 text-muted-foreground">
        Update your idea details. Idea ID:{" "}
        <code className="text-primary">{params.id}</code>
      </p>

      <form className="mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Idea title..." disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="teaserText">Teaser Text</Label>
          <Textarea id="teaserText" placeholder="Teaser..." rows={3} disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hiddenContent">Hidden Content</Label>
          <Textarea
            id="hiddenContent"
            placeholder="Full idea content..."
            rows={8}
            disabled
          />
        </div>

        <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          Full idea editing coming in Phase 2.
        </div>

        <Button type="submit" className="w-full" disabled>
          Save Changes
        </Button>
      </form>
    </div>
  );
}
