import Link from "next/link";
import { LayoutDashboard, PlusCircle, Settings, Zap } from "lucide-react";
import { Navbar } from "@/components/navbar";

const SIDEBAR_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/creator", label: "Creator Studio", icon: Zap },
  { href: "/creator/ideas/new", label: "New Idea", icon: PlusCircle },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 border-r border-border bg-card md:flex md:flex-col">
          <nav className="flex flex-col gap-1 p-4">
            {SIDEBAR_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
