'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import Header from '@/components/layout/Header';
import { createClient } from '@/lib/supabase/client';

interface DesignerApplication {
  id: string;
  created_at: string;
  user_id: string;
  designer_name: string;
  portfolio_url: string;
  description: string;
  specialties: string[];
  status: 'pending' | 'approved' | 'rejected';
  reviewed_at?: string;
  rejection_reason?: string;
}

interface User {
  id: string;
  email: string;
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useRole();
  const { confirm } = useConfirmDialog();
  const router = useRouter();
  
  const [applications, setApplications] = useState<DesignerApplication[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'applications' | 'users'>('applications');
  const [selectedApp, setSelectedApp] = useState<DesignerApplication | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    if (!authLoading && !roleLoading) {
      if (!user) {
        router.push('/');
      } else if (!isAdmin) {
        router.push('/dashboard');
      } else {
        fetchData();
      }
    }
  }, [user, isAdmin, authLoading, roleLoading, router]);

  const fetchData = async () => {
    setLoading(true);
    const supabase = createClient();

    try {
      // Fetch applications
      const { data: appsData, error: appsError } = await supabase
        .from('designer_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (appsError) throw appsError;
      setApplications(appsData || []);

      // Fetch users (only basic info for privacy)
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('id')
        .limit(100);

      if (usersError) throw usersError;
      
      // Type assertion for usersData
      const typedUsersData = usersData as { id: string }[] | null;
      
      // Get emails from auth
      setUsers(typedUsersData?.map(u => ({ id: u.id, email: `user-${u.id.substring(0, 8)}` })) || []);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (application: DesignerApplication) => {
    const confirmed = await confirm({
      title: 'Approve Designer',
      message: `Are you sure you want to approve ${application.designer_name} as a designer?`,
      confirmText: 'Approve',
      cancelText: 'Cancel',
      confirmVariant: 'success',
    });
    
    if (!confirmed) return;

    const supabase = createClient();
    
    try {
      // Update application status
      const { error: updateError } = await supabase
        .from('designer_applications')
        .update({
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id,
        } as never)
        .eq('id', application.id);

      if (updateError) throw updateError;

      // Update user role to designer
      const { error: roleError } = await supabase
        .from('profiles')
        .update({ role: 'designer', is_verified: true } as never)
        .eq('id', application.user_id);

      if (roleError) throw roleError;

      // Create designer profile
      const { error: designerError } = await supabase
        .from('designers')
        .insert({
          user_id: application.user_id,
          name: application.designer_name,
          username: application.designer_name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
          avatar_initials: application.designer_name.substring(0, 2).toUpperCase(),
          bio: application.description,
          specialties: application.specialties,
          verified: true,
        } as never);

      if (designerError) throw designerError;

      toast.success('Application approved successfully!');
      fetchData();
    } catch (error) {
      console.error('Error approving application:', error);
      toast.error('Failed to approve application');
    }
  };

  const handleReject = async () => {
    if (!selectedApp || !rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }

    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('designer_applications')
        .update({
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id,
          rejection_reason: rejectionReason,
        } as never)
        .eq('id', selectedApp.id);

      if (error) throw error;

      toast.success('Application rejected');
      setSelectedApp(null);
      setRejectionReason('');
      fetchData();
    } catch (error) {
      console.error('Error rejecting application:', error);
      toast.error('Failed to reject application');
    }
  };

  if (authLoading || roleLoading || loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-1/3"></div>
              <div className="h-64 bg-white/10 rounded-xl"></div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!user || !isAdmin) return null;

  const pendingApplications = applications.filter(a => a.status === 'pending');
  const approvedApplications = applications.filter(a => a.status === 'approved');
  const rejectedApplications = applications.filter(a => a.status === 'rejected');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Manage designer applications and users</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 rounded-xl p-6 border border-yellow-500/20">
              <p className="text-gray-400 text-sm mb-1">Pending</p>
              <p className="text-3xl font-bold text-white">{pendingApplications.length}</p>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-6 border border-green-500/20">
              <p className="text-gray-400 text-sm mb-1">Approved</p>
              <p className="text-3xl font-bold text-white">{approvedApplications.length}</p>
            </div>
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-xl p-6 border border-red-500/20">
              <p className="text-gray-400 text-sm mb-1">Rejected</p>
              <p className="text-3xl font-bold text-white">{rejectedApplications.length}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-6 border border-blue-500/20">
              <p className="text-gray-400 text-sm mb-1">Total Users</p>
              <p className="text-3xl font-bold text-white">{users.length}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'applications'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Applications ({pendingApplications.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Users
            </button>
          </div>

          {/* Content */}
          {activeTab === 'applications' ? (
            <div className="space-y-6">
              {/* Pending Applications */}
              {pendingApplications.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Pending Review</h2>
                  <div className="space-y-4">
                    {pendingApplications.map(app => (
                      <div key={app.id} className="bg-white/5 rounded-xl p-6 border border-yellow-500/30">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">{app.designer_name}</h3>
                            <p className="text-gray-400 text-sm">
                              Applied {new Date(app.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                            Pending
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <p className="text-gray-400 text-sm mb-1">Portfolio</p>
                            <a
                              href={app.portfolio_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-300 text-sm"
                            >
                              {app.portfolio_url}
                            </a>
                          </div>

                          <div>
                            <p className="text-gray-400 text-sm mb-1">Description</p>
                            <p className="text-white text-sm">{app.description}</p>
                          </div>

                          <div>
                            <p className="text-gray-400 text-sm mb-2">Specialties</p>
                            <div className="flex flex-wrap gap-2">
                              {app.specialties.map(spec => (
                                <span key={spec} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                                  {spec}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleApprove(app)}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approved */}
              {approvedApplications.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Approved</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {approvedApplications.map(app => (
                      <div key={app.id} className="bg-white/5 rounded-xl p-4 border border-green-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-medium">{app.designer_name}</h3>
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                            Approved
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {new Date(app.reviewed_at || app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rejected */}
              {rejectedApplications.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Rejected</h2>
                  <div className="space-y-3">
                    {rejectedApplications.map(app => (
                      <div key={app.id} className="bg-white/5 rounded-xl p-4 border border-red-500/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-medium">{app.designer_name}</h3>
                            {app.rejection_reason && (
                              <p className="text-gray-400 text-sm mt-1">Reason: {app.rejection_reason}</p>
                            )}
                          </div>
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">
                            Rejected
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {applications.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-400">No applications yet</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">User Management</h2>
              <p className="text-gray-400">User management features coming soon...</p>
            </div>
          )}
        </div>
      </main>

      {/* Rejection Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
          <div className="bg-[#1a1a1a] rounded-xl p-6 max-w-md w-full border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Reject Application</h3>
            <p className="text-gray-400 mb-4">
              Rejecting application from <strong>{selectedApp.designer_name}</strong>
            </p>
            
            <textarea
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Provide a reason for rejection..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 resize-none mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={handleReject}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer"
              >
                Confirm Rejection
              </button>
              <button
                onClick={() => {
                  setSelectedApp(null);
                  setRejectionReason('');
                }}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
