'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { div } from 'framer-motion/client'
import Link from 'next/link'

type Techs = {
  name: string
  logo: string
  id: string
  version: string
  link: string
  favorite: boolean
  is_site_stack: boolean
}

const Stack = () => {
  const [tech, setTech] = useState<Techs[]>([])

  useEffect(() => {
    const fetchTech = async () => {
      const { data, error } = await supabase.from('tech').select('*').eq('is_site_stack', true)

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
  <>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {tech.map(item => (
        <a
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative bg-light p-4 rounded-xl flex flex-col items-center group overflow-hidden hover:scale-105 transition-transform duration-300"
        >

          <div className="h-20 flex items-center justify-center z-10">
            <Image
              src={item.logo}
              alt={item.name}
              width={80}
              height={80}
              className="object-contain h-16 w-auto"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-accent text-light text-sm font-medium py-2 px-3 translate-y-full group-hover:translate-y-1 transition-transform duration-300 ease-in-out rounded-b-xl z-20 text-center">
            {item.name} <span className="text-xs text-gray-400">(v.{item.version})</span>
          </div>
        </a>
      ))}
    </div>
  </>
)

}

export default Stack
