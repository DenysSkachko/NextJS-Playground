'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type CinemaCardProps = {
  title: string
  posterPath: string
  alt?: string
  size?: number
}

const CinemaCard = ({ title, posterPath, alt, size = 150 }: CinemaCardProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsPreviewOpen(false)
      }
    }

    if (isPreviewOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPreviewOpen])

  return (
    <div ref={cardRef} className="relative inline-block text-center w-full sm:w-[160px]">
      <div
        className="relative bg-neutral-900 rounded-xl cursor-pointer"
        
        onClick={() => setIsPreviewOpen(!isPreviewOpen)}
      >
        <div
          style={{ height: size, position: 'relative', margin: '0 auto' }}
          className="rounded-md overflow-hidden"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
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

      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-40 top-0 left-1/2 -translate-x-1/2 -translate-y-[50%] rounded-2xl shadow-lg overflow-hidden"
            style={{ width: size * 2 }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt={alt || title}
              width={size * 2}
              height={size * 3}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              className="contrast-80 hover:contrast-100 transition-all duration-300"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CinemaCard
