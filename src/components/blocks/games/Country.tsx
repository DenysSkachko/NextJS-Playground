'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import CountryCard from '@/components/ui/CountryCard'
import SectionTitle from '@/components/ui/SectionTitle'
import { setTheme } from '@/utils/setTheme'
import { themes } from '@/themes/themes'
import { useTheme } from '@/context/ThemeContext'

type Countries = {
  name: string
  flag: string
  id: string
  cities: string
}

const Country = ({ onLoaded }: { onLoaded: () => void }) => {
  const [country, setCountry] = useState<Countries[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchCountry = async () => {
      const { data, error } = await supabase.from('country').select('*')

      if (error) {
        console.error('error', error)
      } else {
        setCountry(data || [])
        onLoaded()

        const savedId = localStorage.getItem('selectedCountryId')
        if (savedId && data) {
          const found = data.find(c => c.id === savedId)
          if (found) {
            setSelectedId(found.id)
            const themeKey = found.name.toLowerCase()
            const theme = themes[themeKey] || themes.default
            setThemeName(themeKey)
          }
        }
      }
    }
    fetchCountry()
  }, [onLoaded])

  const memoizedCountries = useMemo(() => country, [country])

  if (!country.length) {
    return (
      <div className="text-3xl text-light flex justify-center items-center my-auto">Loading...</div>
    )
  }

  const { setThemeName } = useTheme()

  const handleSelect = (item: Countries) => {
    setSelectedId(item.id)
    const themeKey = item.name.toLowerCase()
    setThemeName(themeKey)
  }

  return (
    <>
      <SectionTitle>Countries I have visited</SectionTitle>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {memoizedCountries.map(item => (
          <CountryCard
            key={item.id}
            item={item}
            isSelected={item.id === selectedId}
            onClick={() => handleSelect(item)}
          />
        ))}
      </div>
    </>
  )
}

export default React.memo(Country)
