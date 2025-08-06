'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

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
  }, [])

  if (!country.length) {
    return (
      <div className="text-3xl text-light flex justify-center items-center my-auto">Loading...</div>
    )
  }

  return (
    <>
<h2 className="text-2xl text-light mb-4">🎬 My Favorite Movies</h2>
    <div className="flex flex-wrap gap-5">
      {country.map(item => (
        <div
          key={item.id}
          className="relative w-[120px] h-[90px] px-2 pt-5 pb-2 text-center text-light/50 rounded-sm group hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden"
        >
          
          <Image
            src={item.flag}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, 120px"
            className="object-cover rounded-lg z-10 pb-5"
          />
          <p className="text-white z-20 text-sm mt-2 absolute bottom-0 left-0 rounded-b-sm bg-dark-hover w-full px-1">
            {item.name}
          </p>
        </div>
      ))}
    </div>
    </>
  )
}

export default Country
