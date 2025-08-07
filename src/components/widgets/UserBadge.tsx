'use client'

import { useState, useEffect } from 'react'
import { FiLogOut } from 'react-icons/fi'

type Props = {
  email: string | null
  onLogout: () => void
}

export default function UserBadge({ email, onLogout }: Props) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setOpen(false)
      }
    }
    checkScreen()

    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  if (!isMobile) {
    return (
      <div className="absolute left-70 -top-7 z-10 bg-light py-4 px-4 flex rounded-xl shadow-md">
        <h1 className="font-bold text-dark">{email}</h1>
        <button
          onClick={onLogout}
          className="absolute -top-3 -right-2 px-2 font-bold bg-accent text-light rounded hover:bg-accent-hover transition cursor-pointer"
        >
          Log out
        </button>
      </div>
    )
  }

  return (
    <div className="fixed sm:absolute left-4 sm:right-17 top-4 sm:-top-7 z-20 text-right">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl bg-light p-2 text-dark"
          aria-expanded={open}
          aria-controls="userbadge-menu"
        >
          <FiLogOut size={40} />
        </button>

        <div
          id="userbadge-menu"
          className={`absolute top-full mt-2 w-max max-w-[300px] overflow-hidden rounded-xl bg-light px-4 py-3 shadow-lg transition-all duration-300
          ${open ? 'block max-h-40' : 'pointer-events-none hidden max-h-0'}
          left-0 sm:right-0 sm:left-auto`}
        >
          <h2 className="mb-2 break-words text-right font-semibold text-dark">{email}</h2>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded bg-accent px-3 py-2 text-sm text-white transition hover:bg-red-700"
          >
            <FiLogOut size={16} /> Log out
          </button>
        </div>
      </div>
    </div>
  )
}
