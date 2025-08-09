'use client'

import Device from '@/components/blocks/games/Device'
import EducationSection from '@/components/blocks/games/Education'
import Main from '@/components/blocks/games/Main'
import Tabs from '@/components/ui/Tabs'
import { AnimatePresence, motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <AnimatePresence mode="wait">
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 1.2 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Tabs
        initialTab="Device"
        tabs={[
          { label: 'Main', content: <Main /> },
          { label: 'Device', content: <Device /> },
          { label: 'Edu', content: <EducationSection /> },
        ]}
      />
      </motion.div>
    </AnimatePresence>
  )
}

export default AboutPage
