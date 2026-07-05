import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Lock, Mail, ShieldCheck } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      // Check if response is JSON (in case Vite serves index.html instead of proxying)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (response.ok && data.token) {
          localStorage.setItem('adminToken', data.token);
          navigate('/admin/dashboard');
        } else {
          setError(data.error || 'Login failed');
        }
      } else {
        console.error('Expected JSON, got:', await response.text());
        setError('Server returned an invalid response. Is the API running?');
      }
    } catch (err) {
      console.error('Login request failed:', err);
      setError('Could not connect to the server. Make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-[#0B1B33] text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%),radial-gradient(circle_at_80%_70%,white,transparent_35%)]" />
        <div className="relative flex items-center gap-3">
          <img src="/lovable-uploads/GGL.png" alt="GGL" className="h-10 w-auto bg-white rounded p-1" />
          <span className="font-semibold text-lg">GGL Admin</span>
        </div>
        <div className="relative max-w-md">
          <h1 className="text-3xl font-bold mb-4 leading-snug text-white">Manage your entire site from one place.</h1>
          <p className="text-slate-300 leading-relaxed">
            Edit page content, service listings, global office locations, and images across the GGL India website — no code required.
          </p>
        </div>
        <div className="relative flex items-center gap-2 text-slate-400 text-sm">
          <ShieldCheck size={16} />
          Secured admin access
        </div>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 justify-center mb-8">
            <img src="/lovable-uploads/GGL.png" alt="GGL" className="h-9 w-auto" />
            <span className="font-semibold text-lg text-gray-900">GGL Admin</span>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Sign in</h2>
              <p className="text-gray-500 text-sm mt-1">Enter your credentials to manage content.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm font-medium">
                <AlertCircle size={16} className="shrink-0" /> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9"
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full bg-[#0B1B33] hover:bg-[#0B1B33]/90 text-white">
                {isLoading ? 'Authenticating...' : 'Sign In'}
              </Button>
            </form>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">GGL India Admin Panel</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
