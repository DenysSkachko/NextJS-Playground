'use client'

import { useState } from 'react'
import Stack from '@/components/blocks/games/Stack'
import Commit from '@/components/blocks/games/Commit'
import Slider from '@/components/blocks/games/Slider'
import PortfolioSlider from '@/components/blocks/games/Slider'

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
            <div className="flex flex-col h-full">
              <div className="flex flex-col w-fit mx-auto">
                <h1 className="text-4xl lg:text-8xl bg-accent text-light w-fit rounded-tr-3xl">Welcome</h1>
                <p className="text-light text-md lg:text-lg">
                  this is my playground site where I experiment, build features, and let you learn
                  more about me as a person.
                </p>
                <p className="bg-light text-dark rounded-bl-lg w-fit self-end text-md lg:text-xl p-0">
                  There many interactive buttons in this playground, try to find all
                </p>
              </div>

              <div className="flex-1 bg-dark">
                <PortfolioSlider />
              </div>
            </div>
          </>
        )}

        {activeTab === 'Tech Stack' && <Stack />}

        {activeTab === 'Commits' && <Commit />}
      </div>
    </div>
  )
}
