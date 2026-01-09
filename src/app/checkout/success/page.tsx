'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/lib/i18n';

export default function CheckoutSuccessPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-24 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 dark:bg-white/10 rounded-xl"></div>
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Card */}
          <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl p-8 sm:p-12 border border-green-300 dark:border-green-500/30 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.checkoutSuccess.paymentSuccessful}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              {t.checkoutSuccess.thankYouMessage}
            </p>

            {/* Order Info */}
            <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t.checkoutSuccess.whatHappensNext}</h2>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: t.checkoutSuccess.orderConfirmation,
                    description: t.checkoutSuccess.orderConfirmationDesc,
                    icon: '📧',
                  },
                  {
                    step: 2,
                    title: t.checkoutSuccess.designerContact,
                    description: t.checkoutSuccess.designerContactDesc,
                    icon: '💬',
                  },
                  {
                    step: 3,
                    title: t.checkoutSuccess.delivery,
                    description: t.checkoutSuccess.deliveryDesc,
                    icon: '📦',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-lg flex items-center justify-center text-lg shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-medium">{item.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {t.checkoutSuccess.viewMyOrders}
              </Link>
              <Link
                href="/marketplace"
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white font-medium rounded-lg transition-colors">
                {t.cart.continueShopping}
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {t.checkoutSuccess.questionsAboutOrder}{' '}
              <a href="mailto:support@artvast.com" className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300">
                {t.checkoutSuccess.contactSupport}
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
