"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { ImageIcon, CalendarDays, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthed(!!user);
      setLoading(false);
      if (!user && pathname !== "/admin/login") {
        router.replace("/admin/login");
      }
    });
    return unsub;
  }, [router, pathname]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-off-white flex items-center justify-center">
        <div className="text-text-muted text-[14px]">Loading…</div>
      </div>
    );
  }

  if (pathname === "/admin/login") return <>{children}</>;
  if (!authed) return null;

  return (
    <div className="min-h-screen bg-surface-off-white flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-ink-primary/10 flex flex-col">
        <div className="px-6 py-5 border-b border-ink-primary/10">
          <div className="text-[15px] font-serif text-ink-primary">
            Admin Panel
          </div>
          <div className="text-[11px] text-text-muted mt-0.5">
            Aggelina Tsoumani
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          <NavLink
            href="/admin/artworks"
            icon={ImageIcon}
            label="Artworks"
            pathname={pathname}
          />
          <NavLink
            href="/admin/events"
            icon={CalendarDays}
            label="Events"
            pathname={pathname}
          />
        </nav>

        <div className="p-3 border-t border-ink-primary/10 space-y-0.5">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-[13px] text-text-muted hover:text-ink-primary hover:bg-surface-off-white rounded-lg transition-colors"
          >
            ← View Site
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-text-muted hover:text-accent-linocut-red hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 lg:p-10 overflow-auto">{children}</main>
    </div>
  );
}

function NavLink({
  href,
  icon: Icon,
  label,
  pathname,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  pathname: string;
}) {
  const active = pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
        active
          ? "bg-accent-linocut-red/10 text-accent-linocut-red"
          : "text-text-muted hover:text-ink-primary hover:bg-surface-off-white"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}
