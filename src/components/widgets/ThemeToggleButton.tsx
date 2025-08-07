'use client'

import React from 'react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggleButton() {
  const { themeName, resetTheme } = useTheme()

  if (themeName === 'default') return null

  return (
    <button
      onClick={resetTheme}
      className="bg-dark py-2 px-10 rounded-2xl flex items-center gap-3 text-light font-extrabold"
      aria-label="Disable theme"
      type="button"
    >
      Disable Theme
    </button>
  )
}
