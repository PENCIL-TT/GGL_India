import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { JsonContentEditor } from '@/components/admin/JsonContentEditor';
import { AlertCircle, CheckCircle, Save, ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface Office {
  id: number;
  countryCode: string;
  countryName: string;
  countryLat: number | null;
  countryLng: number | null;
  cityName: string;
  lat: number | null;
  lng: number | null;
  address: string;
  contacts: string[];
  email: string | null;
  mapEmbedUrl: string | null;
  sortOrder: number;
}

const BLANK_OFFICE: Omit<Office, 'id'> = {
  countryCode: '',
  countryName: '',
  countryLat: 0,
  countryLng: 0,
  cityName: '',
  lat: 0,
  lng: 0,
  address: '',
  contacts: [''],
  email: '',
  mapEmbedUrl: '',
  sortOrder: 99,
};

const AdminOfficesManager: React.FC = () => {
  const navigate = useNavigate();
  const [offices, setOffices] = useState<Office[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | 'new' | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Record<string, unknown>>>({});
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadOffices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const loadOffices = () => {
    setIsLoading(true);
    fetch('/api/offices')
      .then((res) => res.json())
      .then((data: Office[]) => setOffices(data))
      .finally(() => setIsLoading(false));
  };

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  });

  const toggleExpand = (office: Office) => {
    if (expandedId === office.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(office.id);
    const { id, ...editable } = office;
    setDrafts((prev) => ({ ...prev, [office.id]: editable }));
  };

  const startNew = () => {
    if (expandedId === 'new') {
      setExpandedId(null);
      return;
    }
    setExpandedId('new');
    setDrafts((prev) => ({ ...prev, new: { ...BLANK_OFFICE } }));
  };

  const handleSave = async (id: number) => {
    setStatusMsg(null);
    try {
      const res = await fetch(`/api/offices/${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(drafts[id]) });
      if (!res.ok) throw new Error('Save failed');
      setStatusMsg({ type: 'success', text: 'Office saved successfully!' });
      loadOffices();
    } catch {
      setStatusMsg({ type: 'error', text: 'Failed to save office.' });
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/offices', { method: 'POST', headers: authHeaders(), body: JSON.stringify(drafts.new) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Create failed');
      setExpandedId(null);
      loadOffices();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err instanceof Error ? err.message : 'Failed to create office.' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this office location? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/offices/${id}`, { method: 'DELETE', headers: authHeaders() });
      if (!res.ok) throw new Error('Delete failed');
      loadOffices();
    } catch {
      setStatusMsg({ type: 'error', text: 'Failed to delete office.' });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center text-lg text-gray-500 py-24">Loading offices...</div>
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
            <h1 className="text-2xl font-bold text-gray-900">Global Offices</h1>
            <p className="text-gray-500 mt-1">Powers the Global Presence map/sidebar and footer office listings.</p>
          </div>
          <Button onClick={startNew} className="gap-2 shrink-0">
            <Plus size={18} /> Add Office
          </Button>
        </div>

        {statusMsg && (
          <div className={`p-4 mb-6 rounded-lg flex items-center gap-2 font-medium ${statusMsg.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {statusMsg.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />} {statusMsg.text}
          </div>
        )}

        {expandedId === 'new' && drafts.new && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 space-y-4">
            <JsonContentEditor value={drafts.new} onChange={(newVal) => setDrafts((prev) => ({ ...prev, new: newVal }))} />
            <Button onClick={handleCreate} className="gap-2 bg-brand-navy hover:bg-brand-navy/90">
              <Save size={16} /> Create Office
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {offices.map((office) => (
            <div key={office.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button type="button" className="w-full flex items-center justify-between p-4 text-left" onClick={() => toggleExpand(office)}>
                <div>
                  <p className="font-semibold text-gray-900">{office.cityName}, {office.countryName}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">{office.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(office.id);
                    }}
                  >
                    <Trash2 size={18} />
                  </Button>
                  {expandedId === office.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {expandedId === office.id && drafts[office.id] && (
                <div className="p-4 border-t border-gray-100 space-y-4">
                  <JsonContentEditor value={drafts[office.id]} onChange={(newVal) => setDrafts((prev) => ({ ...prev, [office.id]: newVal }))} />
                  <Button onClick={() => handleSave(office.id)} className="gap-2 bg-brand-navy hover:bg-brand-navy/90">
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

export default AdminOfficesManager;
