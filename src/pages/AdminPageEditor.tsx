import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { JsonContentEditor } from '@/components/admin/JsonContentEditor';
import { AlertCircle, CheckCircle, Save, ArrowLeft } from 'lucide-react';
import { CMS_PAGES, CMS_SEO_PAGES } from '@/lib/cms-pages';

const ALL_PAGES = [...CMS_PAGES, ...CMS_SEO_PAGES];

const AdminPageEditor: React.FC = () => {
  const { pageKey } = useParams<{ pageKey: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const pageInfo = ALL_PAGES.find((p) => p.key === pageKey);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    if (!pageKey) return;

    setIsLoading(true);
    fetch(`/api/content/${pageKey}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load'))))
      .then((data) => setContent(data && typeof data === 'object' ? data : {}))
      .catch(() => setContent({}))
      .finally(() => setIsLoading(false));
  }, [pageKey, navigate]);

  const handleSave = async () => {
    if (!pageKey) return;
    setIsSaving(true);
    setStatusMsg(null);
    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch(`/api/content/${pageKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(content),
      });
      if (res.status === 401 || res.status === 403) throw new Error('Unauthorized');
      if (!res.ok) throw new Error('Save failed');
      setStatusMsg({ type: 'success', text: 'Saved successfully!' });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err) {
      if (err instanceof Error && err.message === 'Unauthorized') {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        setStatusMsg({ type: 'error', text: 'Failed to save. Check console for details.' });
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || content === null) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center text-lg text-gray-500 py-24">Loading content...</div>
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
          <h1 className="text-2xl font-bold text-gray-900">{pageInfo?.label || pageKey}</h1>
          {pageInfo?.description && <p className="text-gray-500 mt-1">{pageInfo.description}</p>}
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-brand-navy hover:bg-brand-navy/90 gap-2 px-6 py-5 shrink-0">
          <Save size={18} />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {statusMsg && (
        <div className={`p-4 mb-6 rounded-lg flex items-center gap-2 font-medium ${statusMsg.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {statusMsg.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />} {statusMsg.text}
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <JsonContentEditor value={content} onChange={setContent} />
      </div>
    </AdminLayout>
  );
};

export default AdminPageEditor;
