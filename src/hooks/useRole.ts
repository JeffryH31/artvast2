'use client';

import { useAuth } from './useAuth';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export type UserRole = 'user' | 'designer' | 'admin';

interface Profile {
  role: UserRole;
  is_verified: boolean;
}

export function useRole() {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState<UserRole>('user');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      // Wait for auth to finish loading first
      if (authLoading) {
        return;
      }

      if (!user) {
        setRole('user');
        setIsVerified(false);
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('role, is_verified')
        .eq('id', user.id)
        .single();

      const profileData = data as { role?: string; is_verified?: boolean } | null;
      if (profileData && !error) {
        setRole(profileData.role as UserRole);
        setIsVerified(profileData.is_verified || false);
      }
      
      setLoading(false);
    }

    fetchRole();
  }, [user, authLoading]);

  const isUser = role === 'user';
  const isDesigner = role === 'designer' || role === 'admin';
  const isAdmin = role === 'admin';

  return {
    role,
    isVerified,
    loading,
    isUser,
    isDesigner,
    isAdmin,
  };
}
