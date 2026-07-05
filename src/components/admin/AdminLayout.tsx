import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Ship, MapPin, ShieldCheck, FileText, LayoutTemplate, Search,
  ChevronDown, LogOut, Menu, X,
} from 'lucide-react';
import { CMS_PAGES, CMS_SEO_PAGES } from '@/lib/cms-pages';

interface NavLink {
  label: string;
  to: string;
  icon: React.ReactNode;
}

const catalogLinks: NavLink[] = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: <LayoutDashboard size={17} /> },
  { label: 'Services', to: '/admin/services', icon: <Ship size={17} /> },
  { label: 'Global Offices', to: '/admin/offices', icon: <MapPin size={17} /> },
  { label: 'Privacy Policy', to: '/admin/privacy-policy', icon: <ShieldCheck size={17} /> },
  { label: 'Terms of Use', to: '/admin/terms-of-use', icon: <FileText size={17} /> },
];

const pageLinks: NavLink[] = CMS_PAGES.map((p) => ({
  label: p.label,
  to: `/admin/page/${p.key}`,
  icon: <LayoutTemplate size={17} />,
}));

const seoLinks: NavLink[] = CMS_SEO_PAGES.map((p) => ({
  label: p.label.replace(/ — SEO$/, ''),
  to: `/admin/page/${p.key}`,
  icon: <Search size={17} />,
}));

function NavSection({ title, links, currentPath, defaultOpen = true }: { title: string; links: NavLink[]; currentPath: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors"
      >
        {title}
        <ChevronDown size={14} className={`transition-transform ${open ? '' : '-rotate-90'}`} />
      </button>
      {open && (
        <div className="space-y-0.5 mb-2">
          {links.map((link) => {
            const isActive = currentPath === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2.5 mx-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-brand-gold/15 text-brand-gold font-medium'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.icon}
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0B1B33]">
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/10">
        <img src="/lovable-uploads/GGL.png" alt="GGL" className="h-8 w-auto bg-white rounded p-0.5" />
        <div>
          <p className="text-white font-semibold text-sm leading-tight">GGL Admin</p>
          <p className="text-slate-400 text-xs leading-tight">Content Management</p>
        </div>
      </div>

      <nav className="flex-grow overflow-y-auto py-4">
        <NavSection title="Catalogs" links={catalogLinks} currentPath={location.pathname} />
        <NavSection title="Pages" links={pageLinks} currentPath={location.pathname} />
        <NavSection title="SEO / Meta Tags" links={seoLinks} currentPath={location.pathname} defaultOpen={false} />
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut size={17} />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 shrink-0 sticky top-0 h-screen">{sidebarContent}</aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0B1B33] border-b border-white/10">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/GGL.png" alt="GGL" className="h-7 w-auto bg-white rounded p-0.5" />
          <span className="text-white font-semibold text-sm">GGL Admin</span>
        </div>
        <button type="button" onClick={() => setMobileOpen(true)} className="text-white p-1" aria-label="Open menu">
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile off-canvas drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-72 h-full">
            <div className="flex justify-end p-2 bg-[#0B1B33]">
              <button type="button" onClick={() => setMobileOpen(false)} className="text-white p-1" aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <div className="h-[calc(100%-40px)]" onClick={() => setMobileOpen(false)}>
              {sidebarContent}
            </div>
          </div>
          <div className="flex-grow bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      <main className="flex-grow min-w-0 pt-16 md:pt-0">
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-10">{children}</div>
      </main>
    </div>
  );
};
