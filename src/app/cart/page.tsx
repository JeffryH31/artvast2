'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { SkeletonList } from '@/components/ui/Skeleton';

export default function CartPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { 
    items, 
    loading, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    totalItems,
    totalPrice 
  } = useCart();

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-24 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
            </div>
            <SkeletonList count={3} />
          </div>
        </main>
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-24 pb-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 text-sm transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl h-32"></div>
              ))}
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row gap-4 transition-colors duration-300"
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-32 sm:h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-4xl shrink-0">
                      {item.product?.image_url || '📦'}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link 
                        href={`/product/${item.product_id}`}
                        className="text-gray-900 dark:text-white font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        {item.product?.name || 'Product'}
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        by {item.product?.designer?.name || 'Designer'}
                      </p>
                      
                      {/* Price & Quantity */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            -
                          </button>
                          <span className="text-gray-900 dark:text-white w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <p className="text-purple-600 dark:text-purple-400 font-semibold">
                            ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm sticky top-24 transition-colors duration-300">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                      <span>Processing Fee</span>
                      <span>$0.00</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between text-gray-900 dark:text-white font-semibold text-lg">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full py-3 px-4 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg text-center transition-colors"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    href="/marketplace"
                    className="block w-full py-3 px-4 mt-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg text-center transition-colors"
                  >
                    Continue Shopping
                  </Link>

                  {/* Secure Payment */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure Payment
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty Cart */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Cart is Empty</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Looks like you haven&apos;t added any items to your cart yet. Start exploring our marketplace!
              </p>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Browse Marketplace
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
