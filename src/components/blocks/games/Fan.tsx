'use client'

import { useBackground } from '@/context/BackgroundContext'
import MiddleCard from '@/components/ui/MiddleCard'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

type FanClub = {
  id: string
  title: string
  logo: string
  type: string[]
}

const fanTypes = ['football', 'basketball', 'chess', 'dota', 'cs']

const Fan = () => {
  const [fan, setFan] = useState<FanClub[]>([])
  const hasFetched = useRef(false)
  const { backgroundLogo, setBackgroundLogo } = useBackground()

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchFan = async () => {
      const { data, error } = await supabase.from('fan').select('*')
      if (error) {
        console.error('error', error)
      } else {
        setFan(data || [])
      }
    }

    fetchFan()
  }, [])

  if (!fan.length) return <div>LOADING</div>

  return (
    <div className="flex flex-wrap gap-4  sm:max-w-[70%]">
      {fanTypes.map(type => {
        const filtered = fan.filter(item => item.type.includes(type))
        if (!filtered.length) return null

        return (
          <div key={type}>
            <h2 className="bg-light border-1 border-dark rounded-md text-center my-4">{type}</h2>
            <div className="flex flex-wrap gap-4 z-20 justify-center sm:justify-start">
              {filtered.map(item => (
                <MiddleCard
                  key={item.id}
                  title={item.title}
                  image={item.logo}
                  onClick={() => {
                    if (backgroundLogo === item.logo) {
                      setBackgroundLogo(null)
                    } else {
                      setBackgroundLogo(item.logo)
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Fan
