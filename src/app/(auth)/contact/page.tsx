'use client'

import { useState, useEffect } from 'react'
import ContactForm from '@/components/widgets/ContactForm'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SocialLinks from '@/components/widgets/SocialLinks'

const paragraphs = [
  'If you’ve found a bug, an error on the site, issues with loading, or just came up with a cool feature I could add, it would be great if you used the form on the right.',
  "Also, if there's something you liked or didn’t like on my site, feel free to let me know — feedback is exactly what I’d love to get from you.",
  'I’m also adding links to all my social media. If you’d like to reach out but don’t want to use the form, you’re very welcome to contact me there.',
  'I appreciate you reading this far. My name is Denys Skachko, and if you enjoy hidden features, click on the word x — a mini-game awaits you there.',
]

export default function ContactPage() {
  const [typedTexts, setTypedTexts] = useState<string[]>([])
  const [currentParagraph, setCurrentParagraph] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)

  useEffect(() => {
    if (currentParagraph >= paragraphs.length) return

    const currentText = paragraphs[currentParagraph]
    const currentTyped = typedTexts[currentParagraph] || ''

    const timeout = setTimeout(() => {
      const newTyped = currentTyped + currentText[currentCharIndex]
      const updatedTypedTexts = [...typedTexts]
      updatedTypedTexts[currentParagraph] = newTyped
      setTypedTexts(updatedTypedTexts)

      if (currentCharIndex + 1 < currentText.length) {
        setCurrentCharIndex(currentCharIndex + 1)
      } else {
        setCurrentParagraph(currentParagraph + 1)
        setCurrentCharIndex(0)
      }
    }, 15)

    return () => clearTimeout(timeout)
  }, [currentCharIndex, currentParagraph, typedTexts])

  return (
    <div className="flex flex-col xl:flex-row h-full gap-15">
      <div className="flex-1 rounded-2xl text-light relative bg-accent flex flex-col px-4 lg:px-10 py-4 pb-15 lg:py-5 overflow-hidden">
        <motion.h2
          className="font-mickey text-center py-1 text-3xl uppercase text-light bg-dark tracking-[.2em] rounded-t-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
        >
          Contact me
        </motion.h2>

        <div className="px-4 pt-2 lg:py-5 lg:px-10 bg-light/50 text-dark-hover">
          {paragraphs.map((_, index) => (
            <motion.p
              key={index}
              className="py-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: typedTexts[index] ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {typedTexts[index] || ''}
            </motion.p>
          ))}
        </div>

        <Link
          href="/about"
          className="absolute w-full h-[10%] bottom-0 left-0 bg-accent-hover/50 pointer-events-auto"
        >
          <span className=""></span>
        </Link>
      </div>

      <div className="flex flex-col mx-auto justify-center w-full xl:w-100 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 1.5, x: 100 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          exit={{ opacity: 0, y: -20, scale: 0, x: 100 }}
          transition={{ duration: 2.6 }}
        >
          <SocialLinks />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 1.1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0 }}
          transition={{ duration: 1.6 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  )
}
