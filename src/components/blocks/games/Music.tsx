'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

const topArtists = [
  { id: 1, name: 'Oxxymiron', image: '/music/oxxx.webp', audio: '/music/oxxx.mp3' },
  { id: 2, name: 'BI-2', image: '/music/x.png', audio: '/music/x.mp3' },
  { id: 3, name: 'Markul', image: '/music/markul.png', audio: '/music/markul.mp3' },
]

const winterArtists = [
  { id: 4, name: 'Vivaldi', image: '/music/winter.jpg', audio: '/music/winter.mp3' },
  { id: 5, name: 'Plach Yeremii', image: '/music/vona.jpg', audio: '/music/vona.mp3' },
]

const size = 150

export default function Music() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1) // 0..1

  const handleClick = (audio: string) => {
    if (!audioRef.current) return

    if (audio === currentTrack) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    } else {
      audioRef.current.src = audio
      audioRef.current.volume = volume
      audioRef.current.play()
      setCurrentTrack(audio)
      setIsPlaying(true)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value)
    setVolume(newVol)
    if (audioRef.current) {
      audioRef.current.volume = newVol
    }
  }

  const renderArtist = (artist: { id: number; name: string; image: string; audio: string }) => (
    <div
      key={artist.id}
      className="relative bg-neutral-900 rounded-xl text-center cursor-pointer"
      style={{ width: size }}
      onClick={() => handleClick(artist.audio)}
    >
      <div
        style={{ width: size, height: size, position: 'relative', margin: '0 auto' }}
        className="rounded-md overflow-hidden"
      >
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes={`${size}px`}
          className="hover:scale-105 transition-transform"
        />
        <p className="text-white text-sm mt-2 absolute bottom-0 bg-dark-hover w-full px-1">
          {artist.name}
        </p>
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <h2 className="text-2xl text-white mb-4"> Любимые исполнители</h2>
      <div className="flex flex-wrap gap-4 mb-8">{topArtists.map(renderArtist)}</div>

      <h2 className="text-2xl text-white mb-4"> Классика</h2>
      <div className="flex flex-wrap gap-4 mb-6">{winterArtists.map(renderArtist)}</div>

      <audio ref={audioRef} className="hidden" />

      {isPlaying && (
        <div className="fixed bottom-4 left-1/2  transform -translate-x-1/2 bg-dark py-2 px-10 rounded-2xl  z-50 flex items-center gap-3">
          <svg
            className=" w-7 h-7 text-white pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z" />
            <path d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z" />
          </svg>
          <label className="relative flex items-center justify-center w-40 h-10">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 appearance-none bg-accent rounded-full cursor-pointer transition-all duration-300 
          focus:outline-none volume-slider"
              aria-label="Global volume control"
            />
          </label>
        </div>
      )}
    </div>
  )
}
