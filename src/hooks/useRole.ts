'use client';

import { useAuth } from './useAuth';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export type UserRole = 'user' | 'designer' | 'admin';

interface Profile {
  role: UserRole;
  is_verified: boolean;
}

interface DesignerProfile {
  id: string;
  name: string;
  username: string;
  avatar_initials: string;
  avatar_gradient: string;
}

export function useRole() {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState<UserRole>('user');
  const [isVerified, setIsVerified] = useState(false);
  const [designerProfile, setDesignerProfile] = useState<DesignerProfile | null>(null);
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
        setDesignerProfile(null);
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

        // If user is a designer, fetch their designer profile
        if (profileData.role === 'designer' || profileData.role === 'admin') {
          const { data: designerData } = await supabase
            .from('designers')
            .select('id, name, username, avatar_initials, avatar_gradient')
            .eq('user_id', user.id)
            .single();

          if (designerData) {
            setDesignerProfile(designerData as DesignerProfile);
          }
        }
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
    designerProfile,
  };
}
