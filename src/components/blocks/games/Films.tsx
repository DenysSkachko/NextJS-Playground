'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import CinemaCard from '@/components/ui/CinemaCard'

const API_KEY = '66526d5b220f8dabd4147e932c37bec3'

type Movie = {
  id: number
  title: string
  poster_path: string
}

const favoriteIds = [157336, 27205, 496243, 244786, 49026]

const Films = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      const results: Movie[] = []

      for (const id of favoriteIds) {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        )
        const data = await res.json()
        results.push(data)
      }

      setMovies(results)
      setLoading(false)
    }

    fetchFavorites()
  }, [])

  if (loading) {
    return <div className="text-light text-xl p-6">Loading movies...</div>
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl text-light mb-4"> My Favorite Movies</h2>
      <div className="flex flex-wrap gap-4">
        {movies.map(movie => (
          <CinemaCard key={movie.id} title={movie.title} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  )
}

export default Films
