'use client'

import { useEffect, useRef, useState } from 'react'
import Modal from '@/components/ui/Modal'
import SmallCards from '@/components/ui/SmallCards'
import { supabase } from '@/lib/supabase'

type DotaModalProps = {
  isOpen: boolean
  onClose: () => void
}

 type DotaHero = {
  hero_name: string
  hero_image: string
}

type DotaInfoRaw = {
  idx: number
  id: string
  game_id: string
  mmr: number
  rank: string
  roles: string[]
  hours_played: number
  favorite_heroes: string
  steam_id: string
  account_creation_date: string
  description: string | null
}

 type DotaInfo = Omit<DotaInfoRaw, 'favorite_heroes'> & {
  favorite_heroes: DotaHero[]
}

export default function DotaModal({ isOpen, onClose }: DotaModalProps) {
  const [dota, setDota] = useState<DotaInfo[]>([])
  const hasFetched = useRef(false)

  useEffect(() => {
    if (!isOpen || hasFetched.current) return
    hasFetched.current = true

    const fetchDota = async () => {
      const { data, error } = await supabase
  .from<'dota2', DotaInfoRaw>('dota2')
  .select('*')


      if (error) {
        console.error('Supabase error:', error)
        return
      }

      const parsed: DotaInfo[] = (data || []).map(item => ({
        ...item,
        favorite_heroes:
          typeof item.favorite_heroes === 'string'
            ? JSON.parse(item.favorite_heroes)
            : item.favorite_heroes,
      }))

      setDota(parsed)
    }

    fetchDota()
  }, [isOpen])

  if (!isOpen) return null

  const dotainfo = dota[0]
  if (!dotainfo) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="text-3xl text-light flex justify-center items-center my-auto">
          Loading...
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
  <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-items-center gap-8 p-4 sm:p-6">
    <SmallCards label="MMR" value={dotainfo.mmr.toString()} />
    <SmallCards label="Rank" value={dotainfo.rank} />
    <SmallCards label="Roles" value={dotainfo.roles.join(', ')} />
    <SmallCards label="Steam ID" value={dotainfo.steam_id} />
    <SmallCards label="Hours Played" value={dotainfo.hours_played.toString()} />
    <SmallCards label="Account Created" value={dotainfo.account_creation_date} />
    {dotainfo.description && (
      <SmallCards label="Description" value={dotainfo.description} />
    )}

    <div className="col-span-1 sm:col-span-2 flex flex-col items-center">
      <div className="font-semibold mb-2">Favorite Heroes</div>
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap justify-center">
        {dotainfo.favorite_heroes.map((hero) => (
          <div key={hero.hero_name} className="text-center">
            <img
              src={hero.hero_image}
              alt={hero.hero_name}
              className="w-20 h-12 rounded-full mx-auto object-cover"
            />
            <div className="text-sm mt-1">{hero.hero_name}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</Modal>

  )
}
