import Link from "next/link";
import { Lightbulb } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span className="font-semibold tracking-tight text-foreground">MysteryIdea</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The premium marketplace for hidden ideas. Post, price, and profit from your best thinking without the overhead.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-tight text-foreground">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/ideas" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Browse Ideas
                </Link>
              </li>
              <li>
                <Link href="/creator" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Creator Studio
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-tight text-foreground">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-tight text-foreground">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MysteryIdea. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
