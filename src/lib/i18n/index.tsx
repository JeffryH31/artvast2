'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { id, en, TranslationKeys } from './translations';

export type Language = 'id' | 'en';

const translations: Record<Language, TranslationKeys> = {
  id,
  en,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

// Default context value with Indonesian translations
const defaultContextValue: LanguageContextType = {
  language: 'id',
  setLanguage: () => {},
  t: id,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage === 'id' || savedLanguage === 'en') {
      setLanguageState(savedLanguage);
    } else {
      // Default to Indonesian
      setLanguageState('id');
      localStorage.setItem('language', 'id');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}

// Helper hook to get translations directly
export function useTranslation() {
  const { t, language, setLanguage } = useLanguage();
  return { t, language, setLanguage };
}

/**
 * Map database category values to translation keys
 * This handles variations in how categories might be stored in the database
 */
const categoryKeyMap: Record<string, keyof TranslationKeys['categories']> = {
  // Direct key mappings
  'all': 'all',
  'illustration': 'illustration',
  'photography': 'photography',
  'uiux': 'uiux',
  'branding': 'branding',
  '3d': '3d',
  'motion': 'motion',
  'print': 'print',
  'webdesign': 'webDesign',
  'appdesign': 'appDesign',
  'icondesign': 'iconDesign',
  'typography': 'typography',
  'packaging': 'packaging',
  'socialmedia': 'socialMedia',
  'presentation': 'presentation',
  'templates': 'templates',
  'mockups': 'mockups',
  'fonts': 'fonts',
  'graphics': 'graphics',
  'graphicdesign': 'graphicDesign',
  'motiongraphics': 'motionGraphics',
  'other': 'other',
  // Variations with spaces/special chars
  'ui/ux': 'uiux',
  'ui/ux design': 'uiux',
  '3d design': '3d',
  'motion graphics': 'motionGraphics',
  'web design': 'webDesign',
  'app design': 'appDesign',
  'icon design': 'iconDesign',
  'social media': 'socialMedia',
  'graphic design': 'graphicDesign',
};

/**
 * Hook to translate database values to localized text
 * 
 * Usage:
 *   const { translateCategory, translateOrderStatus, translateLicenseType } = useDatabaseTranslation();
 *   <span>{translateCategory(product.category)}</span>
 *   <span>{translateOrderStatus(order.status)}</span>
 */
export function useDatabaseTranslation() {
  const { t } = useLanguage();

  /**
   * Generic translate function for any translation section
   */
  const translateValue = <T extends Record<string, string>>(
    dbValue: string | null | undefined,
    translationSection: T,
    keyMap?: Record<string, string>
  ): string => {
    if (!dbValue) return '';
    
    const normalizedValue = dbValue.toLowerCase().trim().replace(/\s+/g, '');
    const translationKey = keyMap ? keyMap[normalizedValue] || keyMap[dbValue.toLowerCase().trim()] : normalizedValue;
    
    // Try exact match first, then normalized key
    if (translationSection[dbValue as keyof T]) {
      return translationSection[dbValue as keyof T];
    }
    if (translationSection[translationKey as keyof T]) {
      return translationSection[translationKey as keyof T];
    }
    
    // Fallback: return original value with first letter capitalized
    return dbValue.charAt(0).toUpperCase() + dbValue.slice(1);
  };

  /**
   * Translate category from database
   * @example translateCategory('illustration') -> 'Ilustrasi' (in ID)
   */
  const translateCategory = (dbValue: string | null | undefined): string => {
    return translateValue(dbValue, t.categories, categoryKeyMap);
  };

  /**
   * Translate order status from database
   * @example translateOrderStatus('pending') -> 'Menunggu' (in ID)
   */
  const translateOrderStatus = (dbValue: string | null | undefined): string => {
    return translateValue(dbValue, t.orderStatus);
  };

  /**
   * Translate application status from database
   * @example translateApplicationStatus('approved') -> 'Disetujui' (in ID)
   */
  const translateApplicationStatus = (dbValue: string | null | undefined): string => {
    return translateValue(dbValue, t.applicationStatus);
  };

  /**
   * Translate license type from database
   * @example translateLicenseType('commercial') -> 'Penggunaan Komersial' (in ID)
   */
  const translateLicenseType = (dbValue: string | null | undefined): string => {
    return translateValue(dbValue, t.licenseTypes);
  };

  /**
   * Translate delivery time from database
   * @example translateDeliveryTime('1-3 days') -> '1-3 hari' (in ID)
   */
  const translateDeliveryTime = (dbValue: string | null | undefined): string => {
    return translateValue(dbValue, t.deliveryTimes);
  };

  /**
   * Translate payment method from database
   * @example translatePaymentMethod('card') -> 'Kartu Kredit/Debit' (in ID)
   */
  const translatePaymentMethod = (dbValue: string | null | undefined): string => {
    return translateValue(dbValue, t.paymentMethods);
  };

  return {
    translateCategory,
    translateOrderStatus,
    translateApplicationStatus,
    translateLicenseType,
    translateDeliveryTime,
    translatePaymentMethod,
  };
}
