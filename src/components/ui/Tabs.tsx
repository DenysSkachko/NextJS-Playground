'use client'

import { useState, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type TabItem<T extends string> = {
  label: T
  content: ReactNode
}

type TabsProps<T extends string> = {
  tabs: TabItem<T>[]
  initialTab?: T
}

export default function Tabs<T extends string>({ tabs, initialTab }: TabsProps<T>) {
  const [activeTab, setActiveTab] = useState<T>(initialTab ?? tabs[0].label)

  return (
    <div className="h-full flex flex-col">
      
      <div className="flex flex-wrap gap-2 border-b border-accent mb-6 justify-center lg:justify-start">
        {tabs.map(tab => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-4 py-2 rounded-t-lg transition-all ${
              activeTab === tab.label
                ? 'bg-accent text-light'
                : 'bg-dark text-light hover:bg-dark-hover'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            {tabs.find(tab => tab.label === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
