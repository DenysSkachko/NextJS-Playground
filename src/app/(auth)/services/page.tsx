'use client'

import { useState } from 'react'
import Films from '@/components/blocks/games/Films'
import Shows from '@/components/blocks/games/Shows'
import { AnimatePresence, motion } from 'framer-motion'
import Country from '@/components/blocks/games/Country'
import Music from '@/components/blocks/games/Music'
import Food from '@/components/blocks/games/Food'
import Games from '@/components/blocks/games/Games'
import Fan from '@/components/blocks/games/Fan'
import Sport from '@/components/blocks/games/Sport'
import Watch from '@/components/blocks/games/Watch'

export default function ServicesPage() {
  const tabs = ['Watch', 'Music', 'Country', 'Food', 'Fan', 'Games']
  const [activeTab, setActiveTab] = useState('Watch')

  const [tabLoaded, setTabLoaded] = useState(false)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setTabLoaded(false)
  }

  const handleTabLoaded = () => {
    setTabLoaded(true)
  }

  return (
    <div className="p-4 relative min-h-[400px] h-full">
      <div className="flex flex-col absolute -top-10 -right-10 bg-light rounded-lg py-2 z-10">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-15 py-3 font-bold transition-colors cursor-pointer ${
              activeTab === tab ? 'text-light bg-accent' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20, scale: 1.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0 }}
          transition={{ duration: 0.6 }}
          className="pr-40 h-full"
        >
          {activeTab === 'Watch' && (
            <div>
              <Films />
              <Shows />
            </div>
          )}
          {activeTab === 'Music' && (
            <div>
              <Music />
            </div>
          )}
          {activeTab === 'Country' && (
            <div>
              <Country onLoaded={handleTabLoaded} />
            </div>
          )}
          {activeTab === 'Food' && (
            <div>
              <Food />
            </div>
          )}
          {activeTab === 'Fan' && (
            <div>
              <Fan />
            </div>
          )}
          {activeTab === 'Games' && (
            <div className="flex flex-col justify-between h-full gap-4">
              <Games />
              <Sport />
              <Watch />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
