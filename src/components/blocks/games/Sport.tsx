'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import DotaModal from '@/components/blocks/games/dota/Dota'
import HSModal from '@/components/blocks/games/heartstone/Heartstone'
import MiddleAltCard from '@/components/ui/MiddleAltCard'
import { AnimatePresence } from 'framer-motion'

type Games = {
  title: string
  image: string
  id: string
  type: string
}

const Sport = () => {
  const [games, setGames] = useState<Games[]>([])
  const hasFetched = useRef(false)
  const [activeGame, setActiveGame] = useState<string | null>(null)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchGames = async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('type', 'sport')

      if (error) {
        console.error('Ошибка при загрузке игр:', error)
      } else {
        setGames(data || [])
      }
    }

    fetchGames()
  }, [])

  if (!games.length) {
    return (
      <div className="text-3xl text-light flex justify-center items-center my-auto">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
      {games.map((game) => (
        <MiddleAltCard
          key={game.id}
          onClick={() => {
            setActiveGame(game.title)
          }}
          title={game.title}
          image={game.image}
        />
      ))}
    </div>
  )
}

export default Sport
