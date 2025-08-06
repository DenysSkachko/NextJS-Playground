'use client'

import { useEffect, useRef, useState } from 'react'
import Modal from '@/components/ui/Modal'
import SmallCards from '@/components/ui/SmallCards'
import { supabase } from '@/lib/supabase'

import { motion } from 'framer-motion'

type HSModalProps = {
  isOpen: boolean
  onClose: () => void
}

type BGHero = {
  hero_name: string
  hero_image: string
}

type HSInfo = {
  battletag: string
  favorite_class: string | string[]
  account_creation_date: string
  description?: string | null
  battlegrounds: true
  peak_rating: number
  peak_rank: string
  favorite_heroes: BGHero[]
  time_played_bg?: number
}

export default function HSModal({ isOpen, onClose }: HSModalProps) {
  const [hs, setHs] = useState<HSInfo[]>([])
  const hasFetched = useRef(false)

  useEffect(() => {
    if (!isOpen) return
    if (hasFetched.current) return

    hasFetched.current = true

    const fetchHs = async () => {
      const { data, error } = await supabase.from<'hearthstone', HSInfo>('hearthstone').select('*')

      if (error) {
        console.error('Supabase error:', error)
        return
      }

      const parsed: HSInfo[] = (data || []).map(item => ({
        ...item,
        favorite_heroes:
          typeof item.favorite_heroes === 'string'
            ? JSON.parse(item.favorite_heroes)
            : item.favorite_heroes,
      }))

      setHs(parsed)
    }

    fetchHs()
  }, [isOpen])

  if (!isOpen) return null

  const hsinfo = hs[0]

  if (!hsinfo) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="text-3xl text-light flex justify-center items-center my-auto">
          Loading...
        </div>
      </Modal>
    )
  }

  const classes = Array.isArray(hsinfo.favorite_class)
    ? hsinfo.favorite_class
    : [hsinfo.favorite_class]

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <motion.div
          initial={{ opacity: 0, y: 20}}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 items-center justify-items-center gap-8 p-4 sm:p-6"
        >
          <SmallCards label="Battletag" value={hsinfo.battletag} />
          <SmallCards label="Favorite Classes" value={classes.join(', ')} />
          <SmallCards label="Account Created" value={hsinfo.account_creation_date} />
          {hsinfo.description && <SmallCards label="Description" value={hsinfo.description} />}
          <SmallCards label="Peak Rating" value={hsinfo.peak_rating.toString()} />
          <SmallCards label="Peak Rank" value={hsinfo.peak_rank} />
          {hsinfo.time_played_bg !== undefined && (
            <SmallCards label="Time Played BG" value={hsinfo.time_played_bg.toString()} />
          )}

          <div className="col-span-1 sm:col-span-2 flex flex-col items-center">
            <div className="font-semibold mb-2">Favorite Heroes</div>
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap justify-center">
              {hsinfo.favorite_heroes.map(hero => (
                <div key={hero.hero_name} className="text-center">
                  <img
                    src={hero.hero_image}
                    alt={hero.hero_name}
                    className="w-22 h-30 rounded-full mx-auto bg-cover"
                  />
                  <div className="text-sm mt-1">{hero.hero_name}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
    </Modal>
  )
}
