'use client';

import { useState } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import PavanChatbot from './components/chatbot/PavanChatbot';

export default function Home() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    if (['personal', 'telemetry', 'tech-stack', 'projects'].includes(tab)) {
      window.setTimeout(() => {
        document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenChatbot={() => setIsChatOpen(true)}
      />
      <Body activeTab={activeTab} />
      <PavanChatbot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}

