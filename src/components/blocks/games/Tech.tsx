'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { div } from 'framer-motion/client'

type Techs = {
  name: string
  logo: string
  id: string
  version: string
  link: string
  favorite: boolean
  is_site_stack: boolean
}

const Tech = () => {
  const [tech, setTech] = useState<Techs[]>([])

  useEffect(() => {
    const fetchTech = async () => {
      const { data, error } = await supabase.from('tech').select('*')

      if (error) {
        console.error('error', error)
      } else {
        setTech(data || [])
      }
    }
    fetchTech()
  }, [])

  if (!tech.length) {
    return (
      <div className="text-3xl text-light flex justify-center items-center my-auto">Loading...</div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
          {tech.map(item => (
            <div
              key={item.id}
              className="bg-neutral-800 p-4 rounded-xl flex flex-col items-center"
            >
              <Image
                src={item.logo}
                alt={item.name}
                width={64}
                height={64}
                className="mb-2"
              />
              <div className="text-white text-sm font-medium">{item.name}</div>
              <div className="text-gray-400 text-xs">{item.version}</div>
            </div>
          ))}
        </div>
  )
}

export default Tech
