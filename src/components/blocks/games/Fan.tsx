'use client'

import { useBackground } from '@/context/BackgroundContext'
import MiddleCard from '@/components/ui/MiddleCard'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import SectionTitle from '@/components/ui/SectionTitle'

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
    <>
      <SectionTitle>Fan Sector</SectionTitle>
      <div className="flex flex-wrap gap-4  sm:max-w-[70%]">
        {fanTypes.map(type => {
          const filtered = fan.filter(item => item.type.includes(type))
          if (!filtered.length) return null

          return (
            <div key={type} className="w-full flex">
              <h2
                className="bg-dark text-white inline-block px-4 py-2 text-right"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                {type}
              </h2>
              <div className="flex flex-wrap gap-4 z-20">
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
    </>
  )
}

export default Fan
