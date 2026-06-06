"use client";

import { signOut, useSession, SessionProvider } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import "./admin.css";

const LayoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="2"/><rect width="7" height="5" x="14" y="3" rx="2"/><rect width="7" height="9" x="14" y="12" rx="2"/><rect width="7" height="5" x="3" y="16" rx="2"/></svg>
);
const NewspaperIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
);
const CoffeeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);
const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutIcon },
    { name: "Berita", href: "/admin/berita", icon: NewspaperIcon },
    { name: "Menu", href: "/admin/menu", icon: CoffeeIcon },
  ];

  const initial = session?.user?.name?.charAt(0).toUpperCase() || "A";

  return (
    <div className="admin-root">
      {/* Top Navigation */}
      <header className="admin-header">
        <div className="admin-header-left">
          <Link href="/admin" className="admin-logo">
            <span style={{ color: "#d4849a" }}>🌸 Kopi</span> Nusantara
          </Link>

          {/* Desktop Nav */}
          <nav className="admin-header-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
              return (
                <Link key={item.name} href={item.href} className={`admin-nav-link ${isActive ? "active" : ""}`}>
                  <Icon />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="admin-header-right">
          <div className="admin-user-profile">
            <div className="admin-user-info">
              <span className="admin-user-name">{session?.user?.name || "Admin"}</span>
              <span className="admin-user-role">Administrator</span>
            </div>
            <div className="admin-user-avatar">{initial}</div>
          </div>
          
          <button 
            className="admin-logout-btn" 
            onClick={() => signOut({ callbackUrl: "/login" })}
            title="Keluar"
          >
            <LogoutIcon />
          </button>

          <button 
            className="admin-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {/* Mobile Nav Dropdown */}
      <div className={`admin-mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
          return (
            <Link key={item.name} href={item.href} className={`admin-nav-link ${isActive ? "active" : ""}`}>
              <Icon />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Main Content Area */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
