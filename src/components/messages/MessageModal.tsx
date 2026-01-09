'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMessages, Message, Conversation } from '@/hooks/useMessages';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { useLanguage } from '@/lib/i18n';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  designerId: string;
  designerName: string;
  designerInitials: string;
  designerGradient: string;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  designerId,
  designerName,
  designerInitials,
  designerGradient,
}) => {
  const { t } = useLanguage();
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();
  const { isDesigner, designerProfile } = useRole();

  const {
    currentConversation,
    messages,
    messagesLoading,
    sending,
    sendMessage,
    getOrCreateConversation,
    loadMessages,
    subscribeToMessages,
  } = useMessages({ designerId });

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Load messages when conversation is ready
  useEffect(() => {
    if (currentConversation?.id) {
      loadMessages(currentConversation.id);
      subscribeToMessages(currentConversation.id);
    }
  }, [currentConversation?.id, loadMessages, subscribeToMessages]);

  const handleSend = async () => {
    if (!messageInput.trim() || sending) return;

    const content = messageInput.trim();
    setMessageInput('');

    const result = await sendMessage(content);
    if (!result.success) {
      // Restore message if failed
      setMessageInput(content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.created_at).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  const isOwnMessage = (message: Message) => {
    return message.sender_id === user?.id;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg h-[600px] max-h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#5D6BC6]/5 to-[#8B5A8C]/5">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${designerGradient} rounded-full flex items-center justify-center text-white font-bold`}>
              {designerInitials}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{designerName}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.messages.designer}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!user ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <div className="text-4xl mb-4">🔒</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.messages.signInRequired}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t.messages.pleaseSignIn}
                </p>
              </div>
            </div>
          ) : messagesLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-3 border-[#5D6BC6] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <div className="text-4xl mb-4">💬</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.messages.startConversation}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t.messages.sendMessageTo} {designerName}
                </p>
              </div>
            </div>
          ) : (
            <>
              {Object.entries(groupedMessages).map(([date, msgs]) => (
                <div key={date}>
                  {/* Date Separator */}
                  <div className="flex items-center justify-center my-4">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs rounded-full">
                      {formatDate(msgs[0].created_at)}
                    </span>
                  </div>

                  {/* Messages */}
                  {msgs.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${isOwnMessage(message) ? 'justify-end' : 'justify-start'} mb-2`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                          isOwnMessage(message)
                            ? 'bg-gradient-to-r from-[#5D6BC6] to-[#8B5A8C] text-white rounded-br-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                        <div className={`flex items-center justify-end space-x-1 mt-1 ${isOwnMessage(message) ? 'text-white/70' : 'text-gray-400'}`}>
                          <span className="text-[10px]">{formatTime(message.created_at)}</span>
                          {isOwnMessage(message) && message.read && (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        {user && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.messages.typeMessage}
                  rows={1}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D6BC6] focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-400"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!messageInput.trim() || sending}
                className="p-3 bg-gradient-to-r from-[#5D6BC6] to-[#8B5A8C] text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer flex-shrink-0"
              >
                {sending ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              {t.messages.pressEnter}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageModal;
