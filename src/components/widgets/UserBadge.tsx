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
      setIsMobile(window.innerWidth < 1280) 
      if (window.innerWidth >= 1280) {
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
          className="absolute -top-3 -right-2 px-2 font-bold bg-accent text-white rounded hover:bg-red-700 transition cursor-pointer"
        >
          Log out
        </button>
      </div>
    )
  }

  return (
    <div className="absolute left-80 -top-7 z-20">
      <button
        onClick={() => setOpen(!open)}
        className="bg-light text-dark p-2 rounded-xl"
        aria-expanded={open}
        aria-controls="userbadge-menu"
      >
        <FiLogOut size={40} />
      </button>

      <div
        id="userbadge-menu"
        className={`mt-2 w-[220px] transition-all duration-300 rounded-xl bg-light px-4 py-3 shadow-lg overflow-hidden ${
          open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <h2 className="text-dark font-semibold mb-2 break-all">{email}</h2>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm bg-accent text-white px-3 py-2 rounded hover:bg-red-700 transition"
        >
          <FiLogOut size={16} /> Log out
        </button>
      </div>
    </div>
  )
}
