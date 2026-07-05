import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';

interface ImageFieldProps {
  value: string;
  onChange: (url: string) => void;
}

export const ImageField: React.FC<ImageFieldProps> = ({ value, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt="" className="h-16 w-16 object-cover rounded border border-gray-200 bg-gray-50" />
        ) : (
          <div className="h-16 w-16 rounded border border-dashed border-gray-300 bg-gray-50" />
        )}
        <div className="flex-grow space-y-2">
          <Input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="/uploads/... or /image.png" className="bg-white" />
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <Button type="button" variant="outline" size="sm" className="gap-2" disabled={isUploading} onClick={() => fileInputRef.current?.click()}>
            {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
