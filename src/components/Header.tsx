'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaHome, FaInfoCircle, FaHeart, FaEnvelope, FaComments } from 'react-icons/fa'
import { IoLogoXing } from 'react-icons/io5'
import { FaBurger } from 'react-icons/fa6'

const links = [
  { href: '/', label: 'Home', icon: <FaHome /> },
  { href: '/about', label: 'About', icon: <FaInfoCircle /> },
  { href: '/favorite', label: 'Favorite', icon: <FaHeart /> },
  { href: '/contact', label: 'Contact', icon: <FaEnvelope /> },
  { href: '/chat', label: 'Chat', icon: <FaComments /> },
]

const Header = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 1024)
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  const showHeader = isDesktop || isOpen

  return (
    <>
    
      <div className="fixed sm:absolute top-4 sm:-top-7 right-4 sm:right-0 z-50 lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-light bg-accent p-2 rounded-lg">
          {isOpen ? <IoLogoXing size={40} /> : <FaBurger size={40} />}
        </button>

        <AnimatePresence>
          {showHeader && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black z-30 cursor-pointer"
              />

              <motion.header
                key="header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute right-0 top-0 sm:-top-7 z-40 bg-accent rounded-lg lg:rounded-r-none overflow-hidden"
              >
                <ul className="flex flex-col text-light text-center lg:hidden">
                  {links.map(({ href, label, icon }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`uppercase flex items-center gap-2 px-12 py-4 transition-colors duration-200 ${
                          pathname === href ? 'text-dark bg-light' : 'hover:bg-white/20'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {icon}
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.header>
            </>
          )}
        </AnimatePresence>
      </div>

      
      <motion.header
        key="desktop-header"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="absolute top-0 right-0 z-40 hidden lg:flex flex-col bg-accent text-light rounded-r-2xl overflow-hidden group h-full"
      >
        <ul className="flex flex-col items-start">
          {links.map(({ href, label, icon }) => (
            <li key={href} className="w-full">
              <Link
                href={href}
                className={`flex items-center gap-4 px-4 py-4 transition-all duration-300 
                  ${pathname === href ? 'bg-light text-dark' : 'hover:bg-white/20'}
                  w-[60px] group-hover:w-[180px]`}
              >
                <span className="text-3xl">{icon}</span>
                <span
                  className="whitespace-nowrap overflow-hidden transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                >
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.header>
    </>
  )
}

export default Header
