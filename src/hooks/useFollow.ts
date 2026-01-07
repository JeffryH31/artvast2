'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './useAuth';

interface UseFollowOptions {
  designerId: string;
}

export function useFollow({ designerId }: UseFollowOptions) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { user } = useAuth();
  const supabase = createClient();

  // Check if user is following this designer
  const checkFollowStatus = useCallback(async () => {
    if (!user || !designerId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('follows')
        .select('id')
        .eq('follower_id', user.id)
        .eq('following_id', designerId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking follow status:', error);
      }

      setIsFollowing(!!data);
    } catch (err) {
      console.error('Error checking follow status:', err);
    } finally {
      setLoading(false);
    }
  }, [user, designerId, supabase]);

  // Get followers count
  const getFollowersCount = useCallback(async () => {
    if (!designerId) return;

    try {
      const { count, error } = await supabase
        .from('follows')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', designerId);

      if (error) {
        console.error('Error getting followers count:', error);
        return;
      }

      setFollowersCount(count || 0);
    } catch (err) {
      console.error('Error getting followers count:', err);
    }
  }, [designerId, supabase]);

  useEffect(() => {
    checkFollowStatus();
    getFollowersCount();
  }, [checkFollowStatus, getFollowersCount]);

  // Follow a designer
  const follow = async () => {
    if (!user || !designerId || actionLoading) return { success: false, error: 'Not authenticated' };

    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('follows')
        .insert({
          follower_id: user.id,
          following_id: designerId,
        } as never);

      if (error) {
        console.error('Error following:', error);
        return { success: false, error: error.message };
      }

      setIsFollowing(true);
      setFollowersCount(prev => prev + 1);
      return { success: true };
    } catch (err) {
      console.error('Error following:', err);
      return { success: false, error: 'Failed to follow' };
    } finally {
      setActionLoading(false);
    }
  };

  // Unfollow a designer
  const unfollow = async () => {
    if (!user || !designerId || actionLoading) return { success: false, error: 'Not authenticated' };

    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', user.id)
        .eq('following_id', designerId);

      if (error) {
        console.error('Error unfollowing:', error);
        return { success: false, error: error.message };
      }

      setIsFollowing(false);
      setFollowersCount(prev => Math.max(prev - 1, 0));
      return { success: true };
    } catch (err) {
      console.error('Error unfollowing:', err);
      return { success: false, error: 'Failed to unfollow' };
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle follow status
  const toggleFollow = async () => {
    if (isFollowing) {
      return unfollow();
    } else {
      return follow();
    }
  };

  return {
    isFollowing,
    followersCount,
    loading,
    actionLoading,
    follow,
    unfollow,
    toggleFollow,
    refetch: checkFollowStatus,
  };
}
