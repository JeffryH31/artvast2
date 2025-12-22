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
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole>('user');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
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

      if (data && !error) {
        setRole(data.role as UserRole);
        setIsVerified(data.is_verified || false);
      }
      
      setLoading(false);
    }

    fetchRole();
  }, [user]);

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
