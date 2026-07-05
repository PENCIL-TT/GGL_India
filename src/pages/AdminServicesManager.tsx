import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JsonContentEditor } from '@/components/admin/JsonContentEditor';
import { AlertCircle, CheckCircle, Save, ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface Service {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  iconName: string;
  handlingSteps: { title: string; description: string }[];
  whyChooseUs: string[];
  sortOrder: number;
}

const BLANK_SERVICE_FIELDS = {
  title: '',
  subtitle: '',
  heroImage: '',
  iconName: '',
  handlingSteps: [{ title: '', description: '' }],
  whyChooseUs: [''],
  sortOrder: 99,
};

const AdminServicesManager: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Record<string, unknown>>>({});
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newSlug, setNewSlug] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const loadServices = () => {
    setIsLoading(true);
    fetch('/api/services')
      .then((res) => res.json())
      .then((data: Service[]) => setServices(data))
      .finally(() => setIsLoading(false));
  };

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  });

  const toggleExpand = (service: Service) => {
    if (expandedSlug === service.slug) {
      setExpandedSlug(null);
      return;
    }
    setExpandedSlug(service.slug);
    setDrafts((prev) => ({
      ...prev,
      [service.slug]: {
        title: service.title,
        subtitle: service.subtitle,
        heroImage: service.heroImage,
        iconName: service.iconName,
        handlingSteps: service.handlingSteps,
        whyChooseUs: service.whyChooseUs,
        sortOrder: service.sortOrder,
      },
    }));
  };

  const handleSave = async (slug: string) => {
    setStatusMsg(null);
    try {
      const res = await fetch(`/api/services/${slug}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(drafts[slug]) });
      if (!res.ok) throw new Error('Save failed');
      setStatusMsg({ type: 'success', text: `${drafts[slug].title} saved successfully!` });
      loadServices();
    } catch {
      setStatusMsg({ type: 'error', text: 'Failed to save service.' });
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete service "${slug}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/services/${slug}`, { method: 'DELETE', headers: authHeaders() });
      if (!res.ok) throw new Error('Delete failed');
      loadServices();
    } catch {
      setStatusMsg({ type: 'error', text: 'Failed to delete service.' });
    }
  };

  const handleCreate = async () => {
    const slug = newSlug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
    if (!slug) return;
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ slug, title: slug, ...BLANK_SERVICE_FIELDS }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Create failed');
      setNewSlug('');
      setIsCreating(false);
      loadServices();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err instanceof Error ? err.message : 'Failed to create service.' });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center text-lg text-gray-500 py-24">Loading services...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
        <Link to="/admin/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft size={14} /> Back to dashboard
        </Link>
        <div className="flex justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Services</h1>
            <p className="text-gray-500 mt-1">These power both the /services grid and each /services/{'{slug}'} detail page.</p>
          </div>
          <Button onClick={() => setIsCreating((v) => !v)} className="gap-2 shrink-0">
            <Plus size={18} /> Add Service
          </Button>
        </div>

        {statusMsg && (
          <div className={`p-4 mb-6 rounded-lg flex items-center gap-2 font-medium ${statusMsg.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {statusMsg.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />} {statusMsg.text}
          </div>
        )}

        {isCreating && (
          <div className="bg-white p-4 mb-6 rounded-xl border border-gray-200 flex gap-3 items-center">
            <Input value={newSlug} onChange={(e) => setNewSlug(e.target.value)} placeholder="new-service-slug" className="max-w-xs" />
            <Button onClick={handleCreate}>Create</Button>
          </div>
        )}

        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.slug} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                type="button"
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => toggleExpand(service)}
              >
                <div>
                  <p className="font-semibold text-gray-900">{service.title}</p>
                  <p className="text-sm text-gray-500">/services/{service.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(service.slug);
                    }}
                  >
                    <Trash2 size={18} />
                  </Button>
                  {expandedSlug === service.slug ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {expandedSlug === service.slug && drafts[service.slug] && (
                <div className="p-4 border-t border-gray-100 space-y-4">
                  <JsonContentEditor
                    value={drafts[service.slug]}
                    onChange={(newVal) => setDrafts((prev) => ({ ...prev, [service.slug]: newVal }))}
                  />
                  <Button onClick={() => handleSave(service.slug)} className="gap-2 bg-brand-navy hover:bg-brand-navy/90">
                    <Save size={16} /> Save
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
    </AdminLayout>
  );
};

export default AdminServicesManager;
