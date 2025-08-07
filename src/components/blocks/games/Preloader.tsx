'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef(null)
  const lightRef = useRef(null)
  const darkRef = useRef(null)

  useLayoutEffect(() => {
    if (!containerRef.current || !lightRef.current || !darkRef.current) return

    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({ delay: 0.3 })

    // Сначала делаем блоки видимыми
    tl.set([lightRef.current, darkRef.current], { autoAlpha: 1 })

    // Анимация въезда
    tl.fromTo(
      lightRef.current,
      { xPercent: 100, yPercent: -100 },
      { xPercent: 0, yPercent: 0, duration: 2, ease: 'power3.out' }
    )

    tl.fromTo(
      darkRef.current,
      { xPercent: -100, yPercent: 100 },
      { xPercent: 0, yPercent: 20, duration: 2, ease: 'power3.out' },
      '<'
    )

    // Маска исчезновения
    tl.set(
      containerRef.current,
      {
        WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, black 0%)',
        maskImage: 'radial-gradient(circle at center, transparent 0%, black 0%)',
      },
      '+=0.4'
    )

    tl.to(containerRef.current, {
      WebkitMaskImage: 'radial-gradient(circle at center, transparent 100%, black 101%)',
      maskImage: 'radial-gradient(circle at center, transparent 100%, black 101%)',
      duration: 2.6,
      ease: 'power3.inOut',
      onComplete: () => {
        setIsVisible(false)
        document.body.style.overflow = 'auto'
      },
    })

    return () => {
      tl.kill()
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[var(--color-dark)] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 origin-top-left -skew-y-12 overflow-hidden">
        <div
          ref={lightRef}
          className="absolute inset-0 bg-[var(--color-light)] flex items-center justify-center pb-70 xl:pb-20 opacity-0 invisible"
        >
          <h1 className="text-[var(--color-dark)] text-[150px] font-bold z-[100]">Denys</h1>
        </div>
      </div>
      <div className="absolute inset-0 origin-bottom-right -skew-y-12 overflow-hidden">
        <div
          ref={darkRef}
          className="absolute inset-0 bg-[var(--color-accent)] flex items-start justify-center opacity-0 invisible"
        >
          <h1 className="text-[var(--color-light)] text-[150px] font-bold">Skachko</h1>
        </div>
      </div>
    </div>
  )
}

export default Preloader
