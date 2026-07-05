import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { ImageField } from './ImageField';

function humanizeKey(key: string): string {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function looksLikeImageKey(key: string): boolean {
  if (/name$/i.test(key)) return false; // iconName, countryName, etc. are not images
  return /image|logo|photo|picture|banner|thumbnail/i.test(key);
}

function looksLikeImageValue(value: string): boolean {
  return /^(\/|https?:\/\/).*\.(png|jpe?g|gif|webp|svg)$/i.test(value);
}

function blankLike(sample: unknown): unknown {
  if (typeof sample === 'string') return '';
  if (typeof sample === 'number') return 0;
  if (typeof sample === 'boolean') return false;
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === 'object') {
    const copy: Record<string, unknown> = {};
    for (const k of Object.keys(sample as Record<string, unknown>)) copy[k] = blankLike((sample as Record<string, unknown>)[k]);
    return copy;
  }
  return '';
}

interface FieldProps {
  keyName: string;
  value: unknown;
  onChange: (value: unknown) => void;
  onRemove?: () => void;
}

const Field: React.FC<FieldProps> = ({ keyName, value, onChange, onRemove }) => {
  const label = humanizeKey(keyName);

  if (typeof value === 'string') {
    if (looksLikeImageKey(keyName) || looksLikeImageValue(value)) {
      return (
        <FieldWrapper label={label} onRemove={onRemove}>
          <ImageField value={value} onChange={onChange} />
        </FieldWrapper>
      );
    }
    if (value.length > 100 || value.includes('\n')) {
      return (
        <FieldWrapper label={label} onRemove={onRemove}>
          <Textarea value={value} onChange={(e) => onChange(e.target.value)} className="min-h-[100px] bg-white" />
        </FieldWrapper>
      );
    }
    return (
      <FieldWrapper label={label} onRemove={onRemove}>
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="bg-white" />
      </FieldWrapper>
    );
  }

  if (typeof value === 'number') {
    return (
      <FieldWrapper label={label} onRemove={onRemove}>
        <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="bg-white" />
      </FieldWrapper>
    );
  }

  if (typeof value === 'boolean') {
    return (
      <FieldWrapper label={label} onRemove={onRemove}>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
          <span className="text-sm text-gray-600">{value ? 'Enabled' : 'Disabled'}</span>
        </label>
      </FieldWrapper>
    );
  }

  if (Array.isArray(value)) {
    return (
      <FieldWrapper label={label} onRemove={onRemove}>
        <RepeaterField items={value} onChange={onChange} />
      </FieldWrapper>
    );
  }

  if (value && typeof value === 'object') {
    return (
      <FieldWrapper label={label} onRemove={onRemove} boxed>
        <ObjectFields value={value as Record<string, unknown>} onChange={onChange} />
      </FieldWrapper>
    );
  }

  return null;
};

const FieldWrapper: React.FC<{ label: string; onRemove?: () => void; boxed?: boolean; children: React.ReactNode }> = ({
  label,
  onRemove,
  boxed,
  children,
}) => (
  <div className={boxed ? 'border border-gray-200 rounded-lg p-4 bg-gray-50/50' : ''}>
    <div className="flex items-center justify-between mb-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {onRemove && (
        <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={onRemove}>
          <Trash2 size={14} />
        </Button>
      )}
    </div>
    {children}
  </div>
);

const ObjectFields: React.FC<{ value: Record<string, unknown>; onChange: (value: Record<string, unknown>) => void }> = ({ value, onChange }) => (
  <div className="space-y-4">
    {Object.keys(value).map((key) => (
      <Field
        key={key}
        keyName={key}
        value={value[key]}
        onChange={(newVal) => onChange({ ...value, [key]: newVal })}
      />
    ))}
  </div>
);

const RepeaterField: React.FC<{ items: unknown[]; onChange: (items: unknown[]) => void }> = ({ items, onChange }) => {
  const addItem = () => {
    const sample = items.length > 0 ? items[items.length - 1] : '';
    onChange([...items, blankLike(sample)]);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-start">
          <div className="flex-grow">
            {typeof item === 'object' && item !== null ? (
              <div className="border border-gray-200 rounded-lg p-3 bg-white">
                <ObjectFields
                  value={item as Record<string, unknown>}
                  onChange={(newVal) => {
                    const next = [...items];
                    next[index] = newVal;
                    onChange(next);
                  }}
                />
              </div>
            ) : looksLikeImageValue(String(item)) ? (
              <ImageField
                value={String(item)}
                onChange={(newVal) => {
                  const next = [...items];
                  next[index] = newVal;
                  onChange(next);
                }}
              />
            ) : (
              <Input
                value={String(item)}
                onChange={(e) => {
                  const next = [...items];
                  next[index] = e.target.value;
                  onChange(next);
                }}
                className="bg-white"
              />
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="gap-2" onClick={addItem}>
        <Plus size={14} /> Add Item
      </Button>
    </div>
  );
};

interface JsonContentEditorProps {
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}

export const JsonContentEditor: React.FC<JsonContentEditorProps> = ({ value, onChange }) => {
  if (!value || typeof value !== 'object') {
    return <p className="text-gray-500">No content structure to edit yet.</p>;
  }
  return <ObjectFields value={value} onChange={onChange as (v: Record<string, unknown>) => void} />;
};
