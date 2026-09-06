'use client';

import Header from './components/Header';
import Body from './components/Body';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Header />
      <Body />
    </div>
  );
}

