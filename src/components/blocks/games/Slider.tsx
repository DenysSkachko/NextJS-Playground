'use client'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { useState } from 'react'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'

const slides = [
  {
    title: 'GitHub',
    description: 'My public repositories and open-source work',
    link: 'https://github.com/DenysSkachko',
    image: 'https://skillicons.dev/icons?i=github',
  },
  {
    title: 'DS Webpage',
    description: 'Interactive resume site built with React/TS',
    link: 'https://denys-skachko.vercel.app',
    image: '/favicon.png',
  },
  {
    title: 'Telegram',
    description: 'Contact me directly Telegram',
    link: 'https://t.me/denys_skachko',
    image: 'https://cdn-icons-png.flaticon.com/512/2111/2111646.png',
  },
]

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    slides: {
      perView: 1,
      spacing: 20,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  const prevSlide = () => instanceRef.current?.prev()
  const nextSlide = () => instanceRef.current?.next()

  return (
    <div className="relative max-w-xl mx-auto select-none">
      <div ref={sliderRef} className="keen-slider rounded-2xl overflow-hidden shadow-2xl mt-4 ">
        {slides.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="keen-slider__slide flex flex-col items-center p-4 rounded-2xl bg-dark-hover shadow-lg
              transition-transform duration-300 ease-in-out text-white"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 mb-5 rounded-full bg-light/10 p-3 shadow-md"
              loading="lazy"
              draggable={false}
            />
            <h3 className="text-2xl font-extrabold mb-2 tracking-tight text-accent drop-shadow-md">
              {item.title}
            </h3>
            <p className="text-center text-light max-w-xs leading-relaxed font-light">
              {item.description}
            </p>
          </a>
        ))}
      </div>

      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute top-1/2 -left-6 z-20 -translate-y-1/2 rounded-full bg-accent p-3 shadow-lg hover:bg-accent-hover focus:outline-none transition"
      >
        <HiArrowLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute top-1/2 -right-6 z-20 -translate-y-1/2 rounded-full bg-accent p-3 shadow-lg hover:bg-accent-hover focus:outline-none transition"
      >
        <HiArrowRight className="w-6 h-6 text-white" />
      </button>

      <div className="flex justify-center gap-3 mt-6">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-4 h-4 rounded-full transition
              ${currentSlide === idx ? 'bg-accent ' : 'bg-alt hover:bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  )
}
