'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { createClient } from '@/lib/supabase/client';

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { items, loading: cartLoading, totalPrice, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    notes: '',
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // Pre-fill email
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  // Redirect if cart is empty (after loading)
  useEffect(() => {
    if (!cartLoading && items.length === 0 && !processing) {
      router.push('/cart');
    }
  }, [cartLoading, items.length, processing, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || processing) return;

    setProcessing(true);
    const supabase = createClient();

    try {
      // Create orders for each item
      for (const item of items) {
        await supabase.from('orders').insert({
          user_id: user.id,
          product_id: item.product_id,
          total_price: (item.product?.price || 0) * item.quantity,
          payment_method: paymentMethod,
          status: 'pending',
          payment_status: 'paid', // Simulated payment
          notes: formData.notes,
        });
      }

      // Clear cart after successful checkout
      await clearCart();

      // Redirect to success page
      router.push('/checkout/success');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (authLoading || cartLoading) {
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

  if (!user) return null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/cart" 
              className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-4 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Cart
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h2 className="text-lg font-semibold text-white mb-4">Payment Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                      { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                      { id: 'crypto', label: 'Cryptocurrency', icon: '₿' },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === method.id 
                            ? 'bg-purple-500/20 border-2 border-purple-500' 
                            : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <span className="text-2xl">{method.icon}</span>
                        <span className="text-white font-medium">{method.label}</span>
                        {paymentMethod === method.id && (
                          <svg className="w-5 h-5 text-purple-400 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </label>
                    ))}
                  </div>

                  {/* Card Details (simulated) */}
                  {paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Notes */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h2 className="text-lg font-semibold text-white mb-4">Order Notes (Optional)</h2>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special instructions for the designer..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 sticky top-24">
                  <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
                  
                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-xl shrink-0">
                          {item.product?.image_url || '📦'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {item.product?.name}
                          </p>
                          <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-white text-sm font-medium">
                          ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-3">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Processing Fee</span>
                      <span>$0.00</span>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <div className="flex justify-between text-white font-semibold text-lg">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-6 py-3 px-4 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Complete Purchase
                      </>
                    )}
                  </button>

                  {/* Trust badges */}
                  <div className="mt-6 flex items-center justify-center gap-4 text-gray-500 text-xs">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      SSL Secured
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
