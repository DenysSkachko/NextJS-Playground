'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type BackgroundContextType = {
  backgroundLogo: string | null
  setBackgroundLogo: (logo: string | null) => void
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined)

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundLogo, setBackgroundLogo] = useState<string | null>(null)

  useEffect(() => {
    if (backgroundLogo) {
      document.body.style.backgroundImage = `url(${backgroundLogo})`
      document.body.style.backgroundRepeat = 'repeat'
      document.body.style.backgroundSize = '200px auto'
      document.body.style.transition = 'background-image 0.5s ease'
    } else {
      document.body.style.backgroundImage = ''
    }

    return () => {
      document.body.style.backgroundImage = ''
    }
  }, [backgroundLogo])

  return (
    <BackgroundContext.Provider value={{ backgroundLogo, setBackgroundLogo }}>
      {children}
    </BackgroundContext.Provider>
  )
}

export const useBackground = () => {
  const context = useContext(BackgroundContext)
  if (!context) {
    throw new Error('useBackground must be used within BackgroundProvider')
  }
  return context
}
