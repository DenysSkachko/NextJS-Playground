'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import MiddleCard from '@/components/ui/MiddleCard'

type FanClub = {
  id: string
  title: string
  logo: string
  type: string[]
}

const fanTypes = ['dota', 'cs', 'football', 'basketball', 'chess']

const Fan = () => {
  const [fan, setFan] = useState<FanClub[]>([])
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchFan = async () => {
      const { data, error } = await supabase.from('fan').select('*')
      if (error) {
        console.error('error', error)
      } else {
        console.log('Загруженные фанаты:', data)
        setFan(data || [])
      }
    }

    fetchFan()
  }, [])

  if (!fan.length) return <div>LOADING</div>

  return (
    <div className="flex flex-wrap gap-4">
      {fanTypes.map(type => {
        const filtered = fan.filter(item => item.type.includes(type))
        if (!filtered.length) return null

        return (
          <div key={type} className="flex flex-col flex-wrap gap-4">
            {filtered.map(item => (
              <MiddleCard key={item.id} title={item.title} image={item.logo} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Fan
