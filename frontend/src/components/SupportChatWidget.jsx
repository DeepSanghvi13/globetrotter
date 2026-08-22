import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare, X, Send, Headphones, CheckCircle2, ShieldCheck,
  Compass, RefreshCw, Sparkles, HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SupportChatWidget = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'm-1', sender: 'admin', text: `Hello ${currentUser?.name || 'Traveler'}! Welcome to GlobeTrotter 24/7 Concierge Support. How can we help with your multi-city journey today?`, timestamp: 'Just now' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatBottomRef = useRef(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Fetch initial chat history
  useEffect(() => {
    fetch('http://localhost:5000/api/support/chat')
      .then(res => res.json())
      .then(data => {
        if (data.conversations && data.conversations.length > 0) {
          const userThread = data.conversations.find(c => c.userEmail === currentUser?.email) || data.conversations[0];
          if (userThread && userThread.messages) {
            setMessages(userThread.messages);
          }
        }
      })
      .catch(() => {});
  }, [currentUser]);

  const handleSendMessage = async (customText) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsSending(true);

    try {
      const res = await fetch('http://localhost:5000/api/support/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: `chat-${currentUser?.email || 'user'}`,
          sender: 'user',
          text: textToSend,
          userName: currentUser?.name || 'Traveler',
          userEmail: currentUser?.email || 'traveler@example.com'
        })
      });
      const data = await res.json();
      if (data.thread && data.thread.messages) {
        setMessages(data.thread.messages);
      }
    } catch (e) {
      // Auto client response fallback
      setTimeout(() => {
        const botReply = {
          id: `m-${Date.now() + 1}`,
          sender: 'admin',
          text: `Thank you for your message! Our concierge team has logged your query: "${textToSend}". We are inspecting your PNR & reservations.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botReply]);
      }, 1000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 1500 }}>
      
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '999px',
            padding: '0.85rem 1.35rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-glow), 0 8px 25px rgba(0,0,0,0.3)',
            fontWeight: 800,
            fontSize: '0.95rem',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ position: 'relative' }}>
            <Headphones size={22} />
            <span style={{
              position: 'absolute', top: '-2px', right: '-2px',
              width: '9px', height: '9px', backgroundColor: '#4ADE80',
              borderRadius: '50%', border: '2px solid var(--color-primary)'
            }} />
          </div>
          <span>Support Chat</span>
        </button>
      )}

      {/* Glassmorphic Live Chat Window */}
      {isOpen && (
        <div className="animate-scale-up" style={{
          width: '360px',
          height: '520px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: '24px',
          border: '1.5px solid var(--border-strong)',
          boxShadow: 'var(--shadow-lg), 0 20px 40px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)'
        }}>
          
          {/* Header Bar */}
          <div style={{
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Headphones size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.1 }}>GlobeTrotter Support</div>
                <div style={{ fontSize: '0.725rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#4ADE80', borderRadius: '50%' }} />
                  <span>Online Concierge Active</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', opacity: 0.85 }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            backgroundColor: 'var(--bg-page)'
          }}>
            {messages.map((msg, i) => {
              const isAdmin = msg.sender === 'admin';
              return (
                <div
                  key={msg.id || i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isAdmin ? 'flex-start' : 'flex-end'
                  }}
                >
                  <div style={{
                    maxWidth: '82%',
                    padding: '0.75rem 1rem',
                    borderRadius: isAdmin ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                    backgroundColor: isAdmin ? 'var(--bg-surface)' : 'var(--color-primary)',
                    color: isAdmin ? 'var(--text-primary)' : '#FFFFFF',
                    border: isAdmin ? '1px solid var(--border)' : 'none',
                    fontSize: '0.875rem',
                    lineHeight: 1.45,
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '0.2rem', padding: '0 0.3rem' }}>
                    {msg.timestamp || '10:30 AM'}
                  </span>
                </div>
              );
            })}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Suggestions */}
          <div style={{
            padding: '0.5rem 0.85rem',
            backgroundColor: 'var(--bg-surface)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto'
          }}>
            {[
              '🎟️ Check PNR Status',
              '✈️ Flight Delay Tracker',
              '🚖 Driver QR Code',
              '🏨 Hotel Check-In'
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                style={{
                  fontSize: '0.7rem',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '999px',
                  border: '1px solid var(--border-strong)',
                  backgroundColor: 'var(--bg-page)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontWeight: 600
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--bg-surface)',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              className="form-input no-icon"
              placeholder="Ask support about tickets or delays..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '0.6rem 0.85rem', borderRadius: '999px' }}
            />
            <button
              type="submit"
              disabled={isSending || !inputText.trim()}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: (!inputText.trim() || isSending) ? 0.6 : 1
              }}
            >
              <Send size={16} />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};

export default SupportChatWidget;
