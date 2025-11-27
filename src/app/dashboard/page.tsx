'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';

interface Order {
  id: string;
  product_id: string;
  status: string;
  total_price: number;
  created_at: string;
  product?: {
    title: string;
    image_url: string;
  };
}

interface SavedProduct {
  id: string;
  product_id: string;
  product?: {
    id: string;
    title: string;
    image_url: string;
    price: number;
    designer?: {
      name: string;
    };
  };
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'saved' | 'settings'>('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{
    full_name: string;
    avatar_url: string;
    bio: string;
  } | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // Fetch user data
  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;

      const supabase = createClient();
      setLoading(true);

      try {
        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        }

        // Fetch orders (jika table orders ada)
        const { data: ordersData } = await supabase
          .from('orders')
          .select(`
            *,
            product:products(title, image_url)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (ordersData) {
          setOrders(ordersData);
        }

        // Fetch saved products (jika table saved_products ada)
        const { data: savedData } = await supabase
          .from('saved_products')
          .select(`
            *,
            product:products(id, title, image_url, price, designer:designers(name))
          `)
          .eq('user_id', user.id)
          .limit(10);

        if (savedData) {
          setSavedProducts(savedData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user]);

  if (authLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0a0a0a] pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-white/10 rounded w-48 mb-8"></div>
              <div className="h-64 bg-white/10 rounded-xl"></div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 sm:p-8 mb-8 border border-white/10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              
              {/* Info */}
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {profile?.full_name || user.email?.split('@')[0] || 'User'}
                </h1>
                <p className="text-gray-400 mb-4">{user.email}</p>
                <p className="text-gray-300 text-sm max-w-lg">
                  {profile?.bio || 'Welcome to your dashboard! Here you can manage your orders, saved products, and account settings.'}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">{orders.length}</p>
                  <p className="text-sm text-gray-400">Orders</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{savedProducts.length}</p>
                  <p className="text-sm text-gray-400">Saved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'orders', label: 'My Orders' },
              { id: 'saved', label: 'Saved Products' },
              { id: 'settings', label: 'Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white/5 rounded-xl h-48"></div>
              ))}
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Orders */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
                      <button 
                        onClick={() => setActiveTab('orders')}
                        className="text-purple-400 text-sm hover:text-purple-300"
                      >
                        View All
                      </button>
                    </div>
                    {orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.slice(0, 3).map((order) => (
                          <div key={order.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">{order.product?.title || 'Product'}</p>
                              <p className="text-gray-400 text-sm">${order.total_price}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                              order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="text-gray-400">No orders yet</p>
                        <Link href="/marketplace" className="text-purple-400 text-sm hover:text-purple-300 mt-2 inline-block">
                          Browse Products
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Saved Products */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-white">Saved Products</h2>
                      <button 
                        onClick={() => setActiveTab('saved')}
                        className="text-purple-400 text-sm hover:text-purple-300"
                      >
                        View All
                      </button>
                    </div>
                    {savedProducts.length > 0 ? (
                      <div className="space-y-4">
                        {savedProducts.slice(0, 3).map((saved) => (
                          <Link 
                            key={saved.id} 
                            href={`/product/${saved.product_id}`}
                            className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">{saved.product?.title || 'Product'}</p>
                              <p className="text-gray-400 text-sm">by {saved.product?.designer?.name || 'Designer'}</p>
                            </div>
                            <p className="text-purple-400 font-medium">${saved.product?.price || 0}</p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <p className="text-gray-400">No saved products</p>
                        <Link href="/marketplace" className="text-purple-400 text-sm hover:text-purple-300 mt-2 inline-block">
                          Discover Products
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Link href="/marketplace" className="bg-white/5 hover:bg-white/10 rounded-xl p-4 text-center transition-colors border border-white/10">
                      <svg className="w-8 h-8 text-purple-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <p className="text-white font-medium text-sm">Marketplace</p>
                    </Link>
                    <Link href="/designers" className="bg-white/5 hover:bg-white/10 rounded-xl p-4 text-center transition-colors border border-white/10">
                      <svg className="w-8 h-8 text-blue-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-white font-medium text-sm">Designers</p>
                    </Link>
                    <Link href="/portfolio" className="bg-white/5 hover:bg-white/10 rounded-xl p-4 text-center transition-colors border border-white/10">
                      <svg className="w-8 h-8 text-green-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-white font-medium text-sm">Portfolio</p>
                    </Link>
                    <button 
                      onClick={() => setActiveTab('settings')}
                      className="bg-white/5 hover:bg-white/10 rounded-xl p-4 text-center transition-colors border border-white/10"
                    >
                      <svg className="w-8 h-8 text-orange-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-white font-medium text-sm">Settings</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                  {orders.length > 0 ? (
                    <div className="divide-y divide-white/10">
                      {orders.map((order) => (
                        <div key={order.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-medium">{order.product?.title || 'Product'}</h3>
                            <p className="text-gray-400 text-sm">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-gray-500 text-xs mt-1">
                              {new Date(order.created_at).toLocaleDateString('id-ID', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric' 
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                              order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {order.status}
                            </span>
                            <p className="text-white font-semibold">${order.total_price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <h3 className="text-xl font-medium text-white mb-2">No Orders Yet</h3>
                      <p className="text-gray-400 mb-6">Start shopping to see your orders here</p>
                      <Link 
                        href="/marketplace"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                      >
                        Browse Marketplace
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Saved Products Tab */}
              {activeTab === 'saved' && (
                <div>
                  {savedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {savedProducts.map((saved) => (
                        <Link 
                          key={saved.id} 
                          href={`/product/${saved.product_id}`}
                          className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all group"
                        >
                          <div className="aspect-video bg-white/10 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="p-4">
                            <h3 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                              {saved.product?.title || 'Product'}
                            </h3>
                            <p className="text-gray-400 text-sm">by {saved.product?.designer?.name || 'Designer'}</p>
                            <p className="text-purple-400 font-semibold mt-2">${saved.product?.price || 0}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white/5 rounded-xl border border-white/10 text-center py-16">
                      <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <h3 className="text-xl font-medium text-white mb-2">No Saved Products</h3>
                      <p className="text-gray-400 mb-6">Save products you like to find them later</p>
                      <Link 
                        href="/marketplace"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                      >
                        Discover Products
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="max-w-2xl">
                  <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Account Settings</h2>
                    
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={profile?.full_name || ''}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user.email || ''}
                          disabled
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Bio
                        </label>
                        <textarea
                          rows={4}
                          defaultValue={profile?.bio || ''}
                          placeholder="Tell us about yourself"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                        />
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-red-900/10 rounded-xl border border-red-500/20 p-6 mt-6">
                    <h3 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm">
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
