'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { createClient } from '@/lib/supabase/client';

export default function BecomeDesignerPage() {
  const { user, loading: authLoading } = useAuth();
  const { isDesigner, loading: roleLoading } = useRole();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    designerName: '',
    portfolioUrl: '',
    description: '',
    specialties: [] as string[],
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingApplication, setExistingApplication] = useState<{
    status: string;
    rejection_reason?: string;
  } | null>(null);

  const specialtyOptions = [
    'Branding',
    'UI/UX Design',
    'Motion Graphics',
    'Illustration',
    'Graphic Design',
    'Photography',
    '3D Design',
    'Web Design',
  ];

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function checkApplication() {
      if (!user) return;
      
      const supabase = createClient();
      const { data } = await supabase
        .from('designer_applications')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setExistingApplication(data);
      }
    }

    checkApplication();
  }, [user]);

  // Redirect if already a designer
  useEffect(() => {
    if (!roleLoading && isDesigner) {
      router.push('/dashboard');
    }
  }, [isDesigner, roleLoading, router]);

  const toggleSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: submitError } = await supabase
        .from('designer_applications')
        .insert({
          user_id: user.id,
          designer_name: formData.designerName,
          portfolio_url: formData.portfolioUrl,
          description: formData.description,
          specialties: formData.specialties,
        } as never);

      if (submitError) throw submitError;

      toast.success('Application submitted! We will review it shortly.');
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || roleLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-24 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!user) return null;

  // Show existing application status
  if (existingApplication) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-24 pb-16 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Designer Application Status</h1>
              
              <div className={`p-4 rounded-lg mb-6 ${
                existingApplication.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-500/20 border border-yellow-400 dark:border-yellow-500/50' :
                existingApplication.status === 'approved' ? 'bg-green-100 dark:bg-green-500/20 border border-green-400 dark:border-green-500/50' :
                'bg-red-100 dark:bg-red-500/20 border border-red-400 dark:border-red-500/50'
              }`}>
                <p className="text-gray-900 dark:text-white font-medium">
                  Status: <span className="capitalize">{existingApplication.status}</span>
                </p>
              </div>

              {existingApplication.status === 'pending' && (
                <p className="text-gray-600 dark:text-gray-400">
                  Your application is being reviewed. We&apos;ll notify you once it&apos;s processed.
                </p>
              )}

              {existingApplication.status === 'approved' && (
                <p className="text-gray-600 dark:text-gray-400">
                  Congratulations! Your application has been approved. You can now start creating products.
                </p>
              )}

              {existingApplication.status === 'rejected' && (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Your application was not approved.
                  </p>
                  {existingApplication.rejection_reason && (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Reason:</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{existingApplication.rejection_reason}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-24 pb-16 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Become a Designer</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join our community of talented designers and start selling your work.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-500/20 border border-red-400 dark:border-red-500/50 rounded-lg text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
            <div className="space-y-6">
              {/* Designer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Designer Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.designerName}
                  onChange={(e) => setFormData({ ...formData, designerName: e.target.value })}
                  placeholder="Your professional name"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Portfolio URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Specialties */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Specialties * (Select at least one)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {specialtyOptions.map((specialty) => (
                    <button
                      key={specialty}
                      type="button"
                      onClick={() => toggleSpecialty(specialty)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        formData.specialties.includes(specialty)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tell us about yourself *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your experience, skills, and what makes your work unique..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none transition-colors"
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting || formData.specialties.length === 0}
                  className="w-full py-3 px-6 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
