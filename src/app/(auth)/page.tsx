'use client'

import { useState } from 'react'
import Stack from '@/components/blocks/games/Stack'
import Commit from '@/components/blocks/games/Commit'
import Slider from '@/components/blocks/games/Slider'

const TABS = ['Welcome', 'Tech Stack', 'Commits'] as const
type Tab = (typeof TABS)[number]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('Welcome')

  return (
    <div className="h-full flex flex-col justify-end">
      <div className="flex gap-2 border-b border-gray-700 mb-6">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg transition-all ${
              activeTab === tab ? 'bg-accent text-white' : 'bg-dark text-light hover:bg-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1">
        {activeTab === 'Welcome' && (
          <>
            <h1 className="text-xl">Welcome</h1>
            <p>
              this is my playground site where I experiment, build features, and let you learn more
              about me as a person.
            </p>
            <Slider />
          </>
        )}

        {activeTab === 'Tech Stack' && <Stack />}

        {activeTab === 'Commits' && <Commit />}
      </div>
    </div>
  )
}
