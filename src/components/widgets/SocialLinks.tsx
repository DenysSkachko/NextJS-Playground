'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaInstagram,
  FaTelegramPlane,
  FaGithub,
  FaLinkedin,
  FaDiscord,
} from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { BsTwitter } from 'react-icons/bs'

const socials = [
  { Icon: FaInstagram, url: 'https://instagram.com/denys.skachko' },
  { Icon: FaTelegramPlane, url: 'https://t.me/stormstyle' },
  { Icon: FaGithub, url: 'https://github.com/DenysSkachko' },
  {
    Icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/denys-skachko-9ba871374/',
  },
  { Icon: SiGmail, url: 'mailto:denya.skachko@gmail.com' },
  { Icon: BsTwitter, url: 'https://x.com/denys_skachko' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const SocialLinks = React.forwardRef((props) => {
  return (
    <motion.div
      className="flex flex-wrap max-w-[200px] justify-center mx-auto sm:max-w-full gap-6 mt-4"
      aria-label="Social media links"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socials.map(({ Icon, url }, i) => (
        <motion.a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          data-social-icon
          className="text-[var(--color-light)] text-4xl transition-transform duration-300 hover:text-[var(--color-accent)] hover:scale-150"
          aria-label={`Link to ${url}`}
          variants={itemVariants}
        >
          <Icon />
        </motion.a>
      ))}
    </motion.div>
  )
})

export default SocialLinks
