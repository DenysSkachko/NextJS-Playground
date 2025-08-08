import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

type LongProps = {
  title: string
  image: string
  size?: number
}

const LongCard = ({ title, image, size = 150 }: LongProps) => {
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
    <>
      <div ref={cardRef} className="relative inline-block text-center">
        <div
          onClick={() => setIsPreviewOpen(!isPreviewOpen)}
          className="relative w-[200px] h-[120px] px-2 pt-5 pb-2 text-center border-1 border-dark-hover bg-dark-hover rounded-md cursor-pointer overflow-hidden"
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 120px"
            className="object-cover z-10 hover:scale-125 transition-all duration-300 pt-6"
          />
          <p className="text-white z-20 text-md absolute top-0 left-0 bg-accent-hover w-full px-1">
            {title}
          </p>
        </div>

        <AnimatePresence>
          {isPreviewOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute bg-light/50 z-40 top-0 left-1/2 -translate-x-1/2 -translate-y-[50%] rounded-2xl shadow-lg"
              style={{ width: size * 2 }}
            >
              <Image
                src={image}
                alt={title}
                width={size * 2}
                height={size * 3}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                className="contrast-80 hover:contrast-100 transition-all duration-300"
              />
              <p className="text-white z-20 text-md absolute bottom-0 left-0 bg-accent-hover w-full px-1 rounded-b-2xl">
                {title}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default LongCard
