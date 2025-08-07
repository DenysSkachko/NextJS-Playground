'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { setTheme } from '@/utils/setTheme'
import { themes } from '@/themes/themes'

type ThemeContextType = {
  themeName: string
  setThemeName: (name: string) => void
  resetTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeNameState] = useState<string>('default')

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeName')
    if (savedTheme) {
      setThemeNameState(savedTheme)
      setTheme(themes[savedTheme] || themes.default)
    } else {
      setTheme(themes.default)
    }
  }, [])

  const setThemeName = (name: string) => {
    setThemeNameState(name)
    localStorage.setItem('themeName', name)
    setTheme(themes[name] || themes.default)
  }

  const resetTheme = () => {
    setThemeNameState('default')
    localStorage.removeItem('themeName')
    setTheme(themes.default)
  }

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
