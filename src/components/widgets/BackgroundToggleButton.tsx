'use client'

import React from 'react'
import { useBackground } from '@/context/BackgroundContext'

export default function BackgroundToggleButton() {
  const { backgroundLogo, setBackgroundLogo } = useBackground()

  if (!backgroundLogo) return null

  return (
    <button
      onClick={() => setBackgroundLogo(null)}
      className="fixed bottom-4 left-1/3 h-14 transform -translate-x-1/2 bg-dark py-2 px-10 rounded-2xl  z-50 flex items-center gap-3 text-light font-extrabold"
      aria-label="Disable background"
      type="button"
    >
      Disable Background
    </button>
  )
}
