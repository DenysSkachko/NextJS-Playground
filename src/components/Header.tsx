'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBurger } from "react-icons/fa6";
import { IoLogoXing } from "react-icons/io5";


const links = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/services', label: 'services' },
  { href: '/contact', label: 'contact' },
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
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-light bg-accent p-2 rounded-lg"
        >
          {isOpen ? <IoLogoXing size={40} /> : <FaBurger size={40} />}
        </button>
      </div>

      <AnimatePresence>
        {showHeader && (
          <motion.header
            key="header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute right-4 sm:right-0 -top-10 sm:-top-7 z-40 bg-accent px-6 py-4 rounded-lg lg:rounded-r-none  lg:px-10 xl:px-20 "
          >

            <ul className="flex flex-col sm:pr-15 gap-4 text-light text-center sm:text-left lg:hidden">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`uppercase block px-4 py-2 rounded transition-colors duration-200 ${
                      pathname === href
                        ? 'text-dark bg-light'
                        : 'hover:bg-white/20'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="hidden lg:flex gap-15 text-light">
              {links.map(({ href, label }) => (
                <li
                  key={href}
                  className="transition-transform duration-300 hover:scale-110"
                >
                  <Link
                    href={href}
                    className={`uppercase transition-colors duration-200 ${
                      pathname === href
                        ? 'text-dark bg-light px-5 py-2 rounded-md'
                        : 'hover:opacity-70'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
