'use client'

import EducationSection from '@/components/blocks/games/Education'
import Main from '@/components/blocks/games/Main'
import { AnimatePresence, motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 1.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Main />{/* 
        <EducationSection /> */}
      </motion.div>
    </AnimatePresence>
  )
}

export default AboutPage
