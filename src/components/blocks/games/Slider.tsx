import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { BiSolidLeftArrow } from 'react-icons/bi'
import { BiSolidRightArrow } from 'react-icons/bi'

type Card = {
  title: string
  description: string
  link: string
  image: string
  alt: string
}

const DEFAULT_DATA: Card[] = [
  {
    title: 'GitHub Repo',
    description: 'Repository of this project',
    link: 'https://github.com/DenysSkachko',
    image: '/tech/github.svg',
    alt: '/git.jpg',
  },
  {
    title: 'Proxima CV',
    description: 'Personal CV-page',
    link: 'https://denys-skachko.vercel.app',
    image: '/favicon.png',
    alt: '/page-cv.webp',
  },
  {
    title: '@StormStyle',
    description: 'Contact me telegram',
    link: 'https://t.me/stormstyle',
    image: '/tech/tg.svg',
    alt: '/tg.jpg',
  },
]

function useAutoplay(callback: () => void, delay = 6500) {
  const saved = useRef(callback)
  useEffect(() => {
    saved.current = callback
  }, [callback])
  useEffect(() => {
    const id = setInterval(() => saved.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

export default function PortfolioSlider({ data = DEFAULT_DATA }: { data?: Card[] }) {
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const count = data.length
  const containerRef = useRef<HTMLDivElement | null>(null)

  useAutoplay(() => {
    if (isPlaying && !isDragging) next()
  }, 4500)

  function prev() {
    setIndex(i => (i - 1 + count) % count)
  }
  function next() {
    setIndex(i => (i + 1) % count)
  }

  function onDragEnd(_: any, info: PanInfo) {
    setIsDragging(false)
    const velocity = info.velocity.x
    const offset = info.offset.x
    if (offset < -80 || velocity < -500) next()
    else if (offset > 80 || velocity > 500) prev()
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === ' ') setIsPlaying(p => !p)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count])

  return (
    <div className="w-full max-w-6xl mx-auto h-full">
      <div className="relative overflow-hidden w-full">
        <div className="flex gap-6 p-6 px-0 md:p-6 h-full">
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4 text-accent hover:text-accent-hover">
              <button
                aria-label="previous"
                onClick={prev}
                className=" text-4xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <BiSolidLeftArrow />
              </button>
              <div className="flex-1 text-md text-light py-2 px-5 rounded-lg ">
                Features - important links
              </div>
              <button
                aria-label="next"
                onClick={next}
                className="text-4xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <BiSolidRightArrow />
              </button>
            </div>

            <div className="relative">
              <AnimatePresence initial={false} mode="wait">
                <motion.a
                  key={index}
                  href={data[index].link}
                  target="_blank"
                  rel="noreferrer"
                  className="group block md:flex gap-6 items-stretch"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                >
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={onDragEnd}
                    className="relative w-full md:w-3/5 rounded-xl bg-accent hover:bg-accent-hover p-6 md:p-8 backdrop-blur-md"
                    whileTap={{ scale: 0.995 }}
                    style={{ touchAction: 'pan-y' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 lg:w-20 lg:h-20  flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
                        <Image
                          src={data[index].image}
                          alt={data[index].title}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-semibold text-white">
                          {data[index].title}
                        </h3>
                        <p className="text-sm md:text-base text-light-hover mt-1 max-w-xl">
                          {data[index].description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="hidden md:block w-2/5 relative">
                    <motion.div
                      className="w-full h-64 md:h-full rounded-xl overflow-hidden shadow-xl"
                      initial={{ scale: 0.98 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 160, damping: 20 }}
                    >
                      <div className="relative w-full h-full bg-dark-hover">
                        <Image
                          src={data[index].alt}
                          alt={data[index].title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </motion.div>

                    <div className="absolute left-0 bottom-3 w-full px-2">
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-light via-accent to-accent-hover rounded-full"
                          style={{ width: `${((index + 1) / count) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.a>
              </AnimatePresence>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  className="px-3 py-1 rounded-md bg-accent hover:bg-accent-hover text-light cursor-pointer"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>

                <div className="flex-1 flex gap-2 items-center  justify-end ">
                  {data.map((d, i) => (
                    <button
                      key={d.title}
                      aria-label={`goto-${i}`}
                      onClick={() => setIndex(i)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-md transition-transform duration-300 ${i === index ? 'scale-105 bg-light-hover' : 'bg-light hover:hover:bg-light-hover cursor-pointer'}`}
                    >
                      <div className="w-8 h-8 relative rounded-sm overflow-hidden flex items-center justify-center">
                        <Image
                          src={d.image}
                          alt={d.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="hidden lg:block text-left">
                        <div className="text-xs text-dark-hover">{d.title}</div>
                        <div className="text-[10px] text-dark">{d.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
