'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import CountryCard from '@/components/ui/CountryCard'
import SectionTitle from '@/components/ui/SectionTitle'

type Countries = {
  name: string
  flag: string
  id: string
  cities: string
}

const Country = ({ onLoaded }: { onLoaded: () => void }) => {
  const [country, setCountry] = useState<Countries[]>([])
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

  return (
    <>
      <SectionTitle>Countries I have visited</SectionTitle>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {memoizedCountries.map(item => (
          <CountryCard key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}

export default React.memo(Country)
