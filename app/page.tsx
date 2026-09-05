'use client';

import { useState } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import PavanChatbot from './components/chatbot/PavanChatbot';
import RecruiterFastTrackModal from './components/modals/RecruiterFastTrackModal';

export default function Home() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.setTimeout(() => {
      document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenChatbot={() => setIsChatOpen(true)}
        onOpenRecruiterModal={() => setIsRecruiterModalOpen(true)}
      />
      <Body
        activeTab={activeTab}
        onOpenRecruiterModal={() => setIsRecruiterModalOpen(true)}
      />
      <PavanChatbot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onClose={() => setIsChatOpen(false)}
      />
      <RecruiterFastTrackModal
        isOpen={isRecruiterModalOpen}
        onClose={() => setIsRecruiterModalOpen(false)}
        onOpenChatbot={() => setIsChatOpen(true)}
      />
    </div>
  );
}
