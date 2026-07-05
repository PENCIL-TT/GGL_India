import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, FileText, ChevronRight, LayoutTemplate, Ship, MapPin, Search } from 'lucide-react';
import { CMS_PAGES, CMS_SEO_PAGES } from '@/lib/cms-pages';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Select a page, service, or office location to manage its content.</p>
      </div>

      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Catalogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <DashboardCard to="/admin/services" icon={<Ship className="h-5 w-5 text-blue-600" />} iconBg="bg-blue-100" title="Services" description="Manage the 8 core service pages: hero, features, and why-choose-us." />
        <DashboardCard to="/admin/offices" icon={<MapPin className="h-5 w-5 text-green-600" />} iconBg="bg-green-100" title="Global Offices" description="Manage every office location shown on Global Presence and the footer." />
        <DashboardCard to="/admin/privacy-policy" icon={<ShieldCheck className="h-5 w-5 text-blue-600" />} iconBg="bg-blue-100" title="Privacy Policy" description="Edit the privacy policy page content." />
        <DashboardCard to="/admin/terms-of-use" icon={<FileText className="h-5 w-5 text-green-600" />} iconBg="bg-green-100" title="Terms of Use" description="Edit the terms and conditions page." />
      </div>

      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Pages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {CMS_PAGES.map((page) => (
          <DashboardCard
            key={page.key}
            to={`/admin/page/${page.key}`}
            icon={<LayoutTemplate className="h-5 w-5 text-indigo-600" />}
            iconBg="bg-indigo-100"
            title={page.label}
            description={page.description}
          />
        ))}
      </div>

      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">SEO / Meta Tags</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CMS_SEO_PAGES.map((page) => (
          <DashboardCard
            key={page.key}
            to={`/admin/page/${page.key}`}
            icon={<Search className="h-5 w-5 text-amber-600" />}
            iconBg="bg-amber-100"
            title={page.label}
            description={page.description}
          />
        ))}
      </div>
    </AdminLayout>
  );
};

const DashboardCard: React.FC<{ to: string; icon: React.ReactNode; iconBg: string; title: string; description: string }> = ({
  to,
  icon,
  iconBg,
  title,
  description,
}) => (
  <Link to={to} className="block">
    <Card className="hover:border-brand-navy hover:shadow-md transition-all h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`${iconBg} p-3 rounded-lg shrink-0`}>{icon}</div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
      </CardHeader>
    </Card>
  </Link>
);

export default AdminDashboard;
