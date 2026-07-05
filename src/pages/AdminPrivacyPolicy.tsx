import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Save, AlertCircle, CheckCircle } from 'lucide-react';

interface Subsection {
  title: string;
  content: string;
}

interface Section {
  title: string;
  content?: string;
  subsections?: Subsection[];
}

const AdminPrivacyPolicy: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Fetch existing content
    fetch('/api/content/privacy-policy')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data)) {
          setSections(data);
        }
      })
      .catch(err => {
        console.error(err);
        // The first time you load this without DB entries it might throw, which is fine
        setStatusMsg({ type: 'error', text: 'Could not load existing content. You can start fresh.' });
      })
      .finally(() => setIsLoading(false));
  }, [navigate]);

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMsg(null);
    
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch('/api/content/privacy-policy', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(sections)
      });
      
      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
      } else if (!response.ok) {
        throw new Error('Failed to save content');
      }
      setStatusMsg({ type: 'success', text: 'Privacy Policy saved successfully!' });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message === 'Unauthorized') {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        setStatusMsg({ type: 'error', text: 'Failed to save content. Check console for details.' });
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Main Section Handlers
  const addSection = () => {
    setSections([...sections, { title: '', content: '' }]);
  };

  const removeSection = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  const updateSection = (index: number, field: keyof Section, value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  // Subsection Handlers
  const addSubsection = (secIndex: number) => {
    const newSections = [...sections];
    const subsections = newSections[secIndex].subsections || [];
    newSections[secIndex] = { ...newSections[secIndex], subsections: [...subsections, { title: '', content: '' }] };
    setSections(newSections);
  };

  const removeSubsection = (secIndex: number, subIndex: number) => {
    const newSections = [...sections];
    const subsections = [...(newSections[secIndex].subsections || [])];
    subsections.splice(subIndex, 1);
    newSections[secIndex] = { ...newSections[secIndex], subsections };
    setSections(newSections);
  };

  const updateSubsection = (secIndex: number, subIndex: number, field: keyof Subsection, value: string) => {
    const newSections = [...sections];
    const subsections = [...(newSections[secIndex].subsections || [])];
    subsections[subIndex] = { ...subsections[subIndex], [field]: value };
    newSections[secIndex] = { ...newSections[secIndex], subsections };
    setSections(newSections);
  };

  if (isLoading) return (
    <AdminLayout><div className="flex items-center justify-center text-lg text-gray-500 py-24">Loading content...</div></AdminLayout>
  );

  return (
    <AdminLayout>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Privacy Policy</h1>
            <p className="text-gray-500 mt-1">Manage sections and subsections displayed on the public page.</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="bg-brand-navy hover:bg-brand-navy/90 gap-2 px-6 py-5">
            <Save size={18} />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {statusMsg && (
          <div className={`p-4 mb-6 rounded-lg flex items-center gap-2 font-medium ${statusMsg.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {statusMsg.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />} {statusMsg.text}
          </div>
        )}

        <div className="space-y-8">
          {sections.map((section, secIndex) => (
            <div key={secIndex} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4 gap-4">
                <div className="flex-grow space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                    <Input value={section.title} onChange={(e) => updateSection(secIndex, 'title', e.target.value)} placeholder="e.g. Introduction" className="font-semibold text-lg bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Content (Optional)</label>
                    <Textarea value={section.content || ''} onChange={(e) => updateSection(secIndex, 'content', e.target.value)} placeholder="Main content for this section..." className="min-h-[100px] bg-gray-50" />
                  </div>
                </div>
                <Button variant="destructive" size="icon" onClick={() => removeSection(secIndex)} className="mt-6"><Trash2 size={18} /></Button>
              </div>

              {/* Subsections Panel */}
              <div className="mt-6 pl-6 border-l-4 border-gray-100 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">Subsections</h4>
                  <Button variant="outline" size="sm" onClick={() => addSubsection(secIndex)} className="gap-2"><Plus size={16} /> Add Subsection</Button>
                </div>
                {section.subsections?.map((sub, subIndex) => (
                  <div key={subIndex} className="bg-gray-50 p-4 rounded-lg flex gap-4 items-start border border-gray-200">
                    <div className="flex-grow space-y-3">
                      <Input value={sub.title} onChange={(e) => updateSubsection(secIndex, subIndex, 'title', e.target.value)} placeholder="Subsection Title" className="font-medium bg-white" />
                      <Textarea value={sub.content} onChange={(e) => updateSubsection(secIndex, subIndex, 'content', e.target.value)} placeholder="Subsection Content..." className="min-h-[80px] bg-white" />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeSubsection(secIndex, subIndex)} className="text-red-500 hover:text-red-700 hover:bg-red-50"><Trash2 size={18} /></Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={addSection} className="gap-2 border-dashed border-2 hover:bg-gray-50 text-gray-700 w-full py-8 text-lg">
            <Plus size={24} /> Add New Section
          </Button>
        </div>
    </AdminLayout>
  );
};

export default AdminPrivacyPolicy;