import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Settings - MysteryIdea",
};

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="mt-2 text-muted-foreground">
        Manage your account preferences.
      </p>

      <Separator className="my-6" />

      <section>
        <h2 className="text-lg font-semibold text-foreground">Profile</h2>
        <form className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input id="name" placeholder="Your name..." disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell buyers about yourself..." rows={3} disabled />
          </div>
          <Button disabled>Save Profile</Button>
        </form>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-lg font-semibold text-foreground">
          Notifications
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Notification preferences coming in Phase 2.
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-lg font-semibold text-foreground">Danger Zone</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Account deletion and data export options coming soon.
        </p>
      </section>
    </div>
  );
}
