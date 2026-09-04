'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './PavanChatbot.module.css';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

interface PavanChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onOpenResumeModal?: () => void;
}

let msgCounter = 0;
function createMessage(sender: 'bot' | 'user', text: string): Message {
  msgCounter += 1;
  return {
    id: `msg-${msgCounter}`,
    sender,
    text,
    time: 'Just now',
  };
}

export default function PavanChatbot({
  isOpen,
  onToggle,
  onClose,
  onOpenResumeModal,
}: PavanChatbotProps) {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "👋 Hi! I'm Pavan's AI Portfolio Assistant. Ask me anything about Pavan's 5.5+ years of React/Next.js experience, his enterprise projects (EA Sports, UGL Telemetry, Amphora), or how to get in touch!",
      time: 'Just now',
    },
  ]);

  const quickPrompts = [
    { label: '⚽ EA FC26 Project', query: 'Tell me about the EA Sports FC26 project' },
    { label: '📡 UGL SignalR & Telemetry', query: 'How did Pavan use SignalR & Highcharts at UGL?' },
    { label: '⚛️ Core React Stack', query: 'What are Pavan\'s core React & Next.js skills?' },
    { label: '📅 Schedule Interview', query: 'How can I schedule an interview with Pavan?' },
    { label: '📄 Contact & Resume', query: 'What are Pavan\'s contact details and resume?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('fc26') || q.includes('ea sports') || q.includes('sports') || q.includes('metaplore')) {
      return "⚽ At Metaplore for Electronic Arts (Jan 2026 - Present), Pavan engineered the FC26 Game Stats Platform using Next.js, React, TypeScript, and Tailwind. He developed player analytics dashboards with Recharts, built a client-side PNG export pipeline, integrated REST APIs in a Micro Frontend setup, and enforced high test confidence using Jest and Stryker mutation testing.";
    }

    if (q.includes('ugl') || q.includes('signalr') || q.includes('telemetry') || q.includes('train') || q.includes('highchart')) {
      return "📡 At Techwave for UGL / Pacific National (Oct 2023 - Present), Pavan built the CMS (Conditional Monitoring System) for trains across South Wales. He integrated Microsoft SignalR for live real-time telemetry streaming and created Highcharts heatmaps and spline area graphs for high-volume telemetry. He also built UGL PMS on the Integra platform with Redux-Saga and SAP integration.";
    }

    if (q.includes('symphony') || q.includes('amphora') || q.includes('trade') || q.includes('trading') || q.includes('etrm')) {
      return "⚡ At Amphora Software (Oct 2025 - Dec 2025), Pavan developed the Symphony Trade Capture ETRM module. He orchestrated complex, dynamic forms using TanStack Form with field-level schema validation and integrated GraphQL APIs for trade validation and pricing.";
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('react') || q.includes('next') || q.includes('tech')) {
      return "⚛️ Pavan's core stack includes React 19, Next.js, TypeScript, JavaScript (ES6+), React Hooks, Redux, Redux-Saga, Tailwind CSS, Fluent UI, Microsoft SignalR, GraphQL, Highcharts, Recharts, TanStack Form, Micro Frontends (Module Federation), Jest, React Testing Library, and Stryker Mutation Testing.";
    }

    if (q.includes('experience') || q.includes('years') || q.includes('background') || q.includes('senior')) {
      return "💼 Pavan is a Senior Front-End Developer with 5.5+ years of hands-on production experience building high-scale, resilient enterprise applications across sports analytics, real-time IoT rail telemetry, and energy trading.";
    }

    if (q.includes('contact') || q.includes('interview') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('call') || q.includes('mobile')) {
      return "📞 You can reach Pavan directly at:\n• Email: pavansaivejju@gmail.com\n• Phone: +91 9133953205\n• LinkedIn: linkedin.com/in/pavan-sai-vejju-2264231b2\n\nHe is actively available for Senior / Lead Front-End roles and high-impact contracts!";
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('pdf')) {
      return "📄 Pavan's ATS-formatted resume is available to view and print right from this portfolio! You can click the 'ATS Resume Preview' button in the header or ask me to open it.";
    }

    if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('university')) {
      return "🎓 Pavan holds a Bachelor of Technology (B.Tech) from Jawaharlal Nehru Technological University, Kakinada (completed in 2019).";
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return "👋 Hello! How can I assist you with Pavan's background, projects, or interview availability today?";
    }

    return "Thanks for asking! Pavan is a Senior Frontend Engineer with 5.5+ years of React/Next.js experience. You can ask me about his work on EA Sports FC26, UGL train telemetry with SignalR, his tech stack, or email him directly at pavansaivejju@gmail.com!";
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMessage = createMessage('user', query);
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart assistant typing
    setTimeout(() => {
      const botResponseText = getBotResponse(query);
      const botMessage = createMessage('bot', botResponseText);
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Chat Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          className={styles.launcherBtn}
          onClick={onToggle}
          aria-label="Open Pavan AI Assistant"
        >
          <span className={styles.launcherPulse} />
          <span className={styles.avatarIcon}>💬</span>
          <span className={styles.launcherText}>
            Chat with <strong>PavanBot</strong>
          </span>
          <span className={styles.launcherBadge}>AI</span>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow} role="dialog" aria-modal="true" aria-label="Recruiter Chatbot">
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.botProfile}>
              <div className={styles.botAvatar}>
                <span>PV</span>
                <span className={styles.onlineDot} />
              </div>
              <div>
                <h4 className={styles.botName}>Pavan&apos;s Recruiter Assistant</h4>
                <p className={styles.botStatus}>● Online • Ready to answer questions</p>
              </div>
            </div>

            <div className={styles.headerControls}>
              <button
                type="button"
                className={styles.minimizeBtn}
                onClick={onClose}
                aria-label="Close Chat"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageWrapper} ${msg.sender === 'user' ? styles.userWrapper : styles.botWrapper}`}
              >
                {msg.sender === 'bot' && (
                  <div className={styles.smallAvatar}>PV</div>
                )}
                <div className={`${styles.messageBubble} ${msg.sender === 'user' ? styles.userBubble : styles.botBubble}`}>
                  <p className={styles.messageText}>{msg.text}</p>
                  <span className={styles.messageTime}>{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className={`${styles.messageWrapper} ${styles.botWrapper}`}>
                <div className={styles.smallAvatar}>PV</div>
                <div className={styles.typingBubble}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          <div className={styles.promptsContainer}>
            <span className={styles.promptsTitle}>Suggested questions:</span>
            <div className={styles.promptsList}>
              {quickPrompts.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={styles.promptBtn}
                  onClick={() => handleSendMessage(p.query)}
                >
                  {p.label}
                </button>
              ))}
              {onOpenResumeModal && (
                <button
                  type="button"
                  className={`${styles.promptBtn} ${styles.resumePromptBtn}`}
                  onClick={onOpenResumeModal}
                >
                  📄 Open ATS Resume
                </button>
              )}
            </div>
          </div>

          {/* Quick Direct Email Reach-out Strip */}
          <div className={styles.emailDirectStrip}>
            <span>Need immediate discussion?</span>
            <a
              href="mailto:pavansaivejju@gmail.com?subject=Interview%20Invitation%20for%20Senior%20Frontend%20Developer&body=Hi%20Pavan,%0A%0AWe%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20for%20a%20Senior%20Front-End%20position."
              className={styles.directEmailLink}
            >
              ✉️ Email Pavan Directly
            </a>
          </div>

          {/* Input Footer */}
          <form
            className={styles.inputArea}
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              placeholder="Ask about skills, projects, SignalR, EA FC26..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={styles.chatInput}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={styles.sendBtn}
              aria-label="Send message"
            >
              ➔
            </button>
          </form>
        </div>
      )}
    </>
  );
}
