'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import CinemaCard from '@/components/ui/CinemaCard'
import SectionTitle from '@/components/ui/SectionTitle'

const API_KEY = '66526d5b220f8dabd4147e932c37bec3'

type Show = {
  id: number
  name: string
  poster_path: string
}

const favoriteShowIds = [2288, 1399, 37680]

const Shows = () => {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShows = async () => {
      const results: Show[] = []

      for (const id of favoriteShowIds) {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
        )
        const data = await res.json()
        results.push(data)
      }

      setShows(results)
      setLoading(false)
    }

    fetchShows()
  }, [])

  if (loading) {
    return <div className="text-light text-xl p-6">Loading shows...</div>
  }

  return (
    <>
      <SectionTitle> Top TV Shows</SectionTitle>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {shows.map(show => (
          <CinemaCard key={show.id} title={show.name} posterPath={show.poster_path} />
        ))}
      </div>
    </>
  )
}

export default Shows
