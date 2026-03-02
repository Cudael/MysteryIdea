"use client";

import Link from "next/link";
import { Lightbulb, Menu } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Marketplace" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/20 transition-colors group-hover:bg-primary/90">
            <Lightbulb className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-foreground">
            MysteryIdea
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="ghost" className="font-bold">
                Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="font-bold hover:text-primary">
                Log in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="rounded-full px-6 font-bold shadow-md shadow-primary/20">
                Start Selling
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>

        {/* Mobile menu */}
        <div className="flex items-center gap-4 md:hidden">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="border-b border-border pb-4">
                <SheetTitle className="flex items-center gap-2 text-lg font-extrabold">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  MysteryIdea
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 pt-6">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-lg px-4 py-3 text-base font-bold text-slate-600 transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SignedIn>
                  <SheetClose asChild>
                    <Link
                      href="/dashboard"
                      className="rounded-lg px-4 py-3 text-base font-bold text-slate-600 transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      Dashboard
                    </Link>
                  </SheetClose>
                </SignedIn>
                <SignedOut>
                  <div className="mt-8 flex flex-col gap-3">
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full justify-center h-12 text-base font-bold">
                        Log in
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full justify-center h-12 text-base font-bold">
                        Get Started
                      </Button>
                    </SignUpButton>
                  </div>
                </SignedOut>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
