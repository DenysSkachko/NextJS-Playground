'use client'

import '../app/globals.css'


export default function MarqueeBackground() {
  const lines = 7
  const texts = ['Proxima ']

  return (
    <div
      className="fixed inset-0 z-1 pointer-events-none flex flex-col justify-around py-2 h-screen"
    >
      {Array.from({ length: lines }).map((_, i) => {
        const isEven = i % 2 === 0
        const text = texts[i % texts.length]
        const baseText = Array(20).fill(text).join('')
        const repeatedText = baseText + baseText

        return (
          <div
            key={i}
            className="relative overflow-hidden w-full h-15 whitespace-nowrap"
          >
            <div
              className={`absolute whitespace-nowrap font-bold text-6xl text-light/50 uppercase ${
                isEven ? 'marqueeLeft' : 'marqueeRight'
              }`}
              style={{ width: '200%' }}
            >
              {repeatedText}
            </div>
          </div>
        )
      })}
    </div>
  )
}
