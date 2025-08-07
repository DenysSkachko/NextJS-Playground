'use client'

import React from 'react'
import { useBackground } from '@/context/BackgroundContext'

export default function BackgroundToggleButton() {
  const { backgroundLogo, setBackgroundLogo } = useBackground()

  if (!backgroundLogo) return null

  return (
    <button
      onClick={() => setBackgroundLogo(null)}
      className="bg-dark py-2 px-10 rounded-2xl flex items-center gap-3 text-light font-extrabold"
      aria-label="Disable background"
      type="button"
    >
      Disable Background
    </button>
  )
}
