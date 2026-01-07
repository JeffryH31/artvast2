'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './useAuth';
import { useRole } from './useRole';

export interface Message {
  id: string;
  created_at: string;
  conversation_id: string;
  sender_id: string;
  sender_type: 'user' | 'designer';
  content: string;
  read: boolean;
  read_at: string | null;
}

export interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  designer_id: string;
  last_message: string | null;
  last_message_at: string;
  unread_count_user: number;
  unread_count_designer: number;
  designer?: {
    id: string;
    name: string;
    username: string;
    avatar_initials: string;
    avatar_gradient: string;
    verified: boolean;
  };
  user?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
}

interface UseMessagesOptions {
  designerId?: string;
  conversationId?: string;
}

export function useMessages({ designerId, conversationId }: UseMessagesOptions = {}) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const { user } = useAuth();
  const { isDesigner, designerProfile } = useRole();
  const supabase = createClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // Get or create conversation with a designer
  const getOrCreateConversation = useCallback(async (targetDesignerId: string) => {
    if (!user) return null;

    try {
      // First, try to find existing conversation
      const { data: existing, error: findError } = await supabase
        .from('conversations')
        .select(`
          *,
          designer:designers(id, name, username, avatar_initials, avatar_gradient, verified)
        `)
        .eq('user_id', user.id)
        .eq('designer_id', targetDesignerId)
        .single();

      if (existing && !findError) {
        setCurrentConversation(existing as Conversation);
        return existing as Conversation;
      }

      // If not found, create new conversation
      const { data: newConversation, error: createError } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          designer_id: targetDesignerId,
        } as never)
        .select(`
          *,
          designer:designers(id, name, username, avatar_initials, avatar_gradient, verified)
        `)
        .single();

      if (createError) {
        console.error('Error creating conversation:', createError);
        return null;
      }

      setCurrentConversation(newConversation as Conversation);
      return newConversation as Conversation;
    } catch (err) {
      console.error('Error getting/creating conversation:', err);
      return null;
    }
  }, [user, supabase]);

  // Load all conversations for user
  const loadConversations = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      let query = supabase
        .from('conversations')
        .select(`
          *,
          designer:designers(id, name, username, avatar_initials, avatar_gradient, verified),
          user:profiles(id, full_name, avatar_url)
        `)
        .order('last_message_at', { ascending: false });

      // If user is a designer, get conversations where they are the designer
      if (isDesigner && designerProfile) {
        query = query.or(`user_id.eq.${user.id},designer_id.eq.${designerProfile.id}`);
      } else {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading conversations:', error);
        return;
      }

      setConversations((data || []) as Conversation[]);
    } catch (err) {
      console.error('Error loading conversations:', err);
    } finally {
      setLoading(false);
    }
  }, [user, isDesigner, designerProfile, supabase]);

  // Load messages for a conversation
  const loadMessages = useCallback(async (convId: string) => {
    if (!user || !convId) return;

    setMessagesLoading(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', convId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      setMessages((data || []) as Message[]);

      // Mark messages as read
      await markAsRead(convId);
    } catch (err) {
      console.error('Error loading messages:', err);
    } finally {
      setMessagesLoading(false);
    }
  }, [user, supabase]);

  // Send a message
  const sendMessage = async (content: string, convId?: string) => {
    const targetConvId = convId || currentConversation?.id;
    if (!user || !targetConvId || !content.trim()) {
      return { success: false, error: 'Invalid message data' };
    }

    setSending(true);
    try {
      // Determine sender type
      const senderType = isDesigner && designerProfile && 
        currentConversation?.designer_id === designerProfile.id 
          ? 'designer' 
          : 'user';

      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: targetConvId,
          sender_id: user.id,
          sender_type: senderType,
          content: content.trim(),
        } as never)
        .select()
        .single();

      if (error) {
        console.error('Error sending message:', error);
        return { success: false, error: error.message };
      }

      // Add message to local state immediately
      setMessages(prev => [...prev, data as Message]);

      return { success: true, message: data as Message };
    } catch (err) {
      console.error('Error sending message:', err);
      return { success: false, error: 'Failed to send message' };
    } finally {
      setSending(false);
    }
  };

  // Mark messages as read
  const markAsRead = async (convId: string) => {
    if (!user || !convId) return;

    try {
      // Determine which field to update based on user type
      const updateField = isDesigner && designerProfile
        ? { unread_count_designer: 0 }
        : { unread_count_user: 0 };

      await supabase
        .from('conversations')
        .update(updateField as never)
        .eq('id', convId);

      // Mark individual messages as read
      const senderTypeToMark = isDesigner && designerProfile ? 'user' : 'designer';
      await supabase
        .from('messages')
        .update({ read: true, read_at: new Date().toISOString() } as never)
        .eq('conversation_id', convId)
        .eq('sender_type', senderTypeToMark)
        .eq('read', false);
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  // Subscribe to real-time messages
  const subscribeToMessages = useCallback((convId: string) => {
    if (!user || !convId) return;

    // Unsubscribe from previous channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase
      .channel(`messages:${convId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${convId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          // Only add if not already in messages (avoid duplicates from optimistic update)
          setMessages(prev => {
            if (prev.some(m => m.id === newMessage.id)) return prev;
            return [...prev, newMessage];
          });
        }
      )
      .subscribe();

    channelRef.current = channel;
  }, [user, supabase]);

  // Get total unread count
  const getTotalUnreadCount = useCallback(() => {
    return conversations.reduce((total, conv) => {
      if (isDesigner && designerProfile) {
        return total + (conv.unread_count_designer || 0);
      }
      return total + (conv.unread_count_user || 0);
    }, 0);
  }, [conversations, isDesigner, designerProfile]);

  // Effect to load conversations on mount
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Effect to load messages when conversation changes
  useEffect(() => {
    if (conversationId) {
      loadMessages(conversationId);
      subscribeToMessages(conversationId);
    }
  }, [conversationId, loadMessages, subscribeToMessages]);

  // Effect to get/create conversation with designer
  useEffect(() => {
    if (designerId && user) {
      getOrCreateConversation(designerId);
    }
  }, [designerId, user, getOrCreateConversation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [supabase]);

  return {
    conversations,
    currentConversation,
    messages,
    loading,
    messagesLoading,
    sending,
    getOrCreateConversation,
    loadConversations,
    loadMessages,
    sendMessage,
    markAsRead,
    subscribeToMessages,
    getTotalUnreadCount,
    setCurrentConversation,
  };
}
