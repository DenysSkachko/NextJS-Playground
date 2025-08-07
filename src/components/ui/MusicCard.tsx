'use client'

import Image from 'next/image'

type MusicCardProps = {
  title: string
  posterPath: string
  alt?: string
  size?: number
  onClick: () => void
}

const MusicCard = ({ title, posterPath, alt, size = 150, onClick }: MusicCardProps) => {
  return (
    <div className="relative inline-block text-center w-full sm:w-[160px] cursor-pointer" onClick={onClick}>
      <div className="relative bg-neutral-900 rounded-xl">
        <div
          style={{ height: size, position: 'relative', margin: '0 auto' }}
          className="rounded-md overflow-hidden"
        >
          <Image
            src={posterPath}
            alt={alt || title}
            fill
            style={{ objectFit: 'cover' }}
            sizes={`${size}px`}
            className="hover:scale-105 transition-transform"
          />
          <p className="text-white text-sm mt-2 absolute bottom-0 bg-dark-hover w-full px-1">
            {title}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MusicCard
