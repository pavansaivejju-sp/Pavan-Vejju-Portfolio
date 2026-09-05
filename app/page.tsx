
'use client';

import { useState } from 'react';
import Header from './components/Header';
import Body from './components/Body';

export default function Home() {
  const [activeTab, setActiveTab] = useState('personal');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    if (['personal', 'tech-stack', 'projects'].includes(tab)) {
      window.setTimeout(() => {
        document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <Body activeTab={activeTab} />
    </div>
  );
}

