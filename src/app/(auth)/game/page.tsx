'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type Card = {
  id: number
  img: string
}

const initialArrayCards: Card[] = [
  { id: 1, img: '/tech/git.svg' },
  { id: 2, img: '/tech/javascript.svg' },
  { id: 3, img: '/tech/react.svg' },
  { id: 4, img: '/tech/nextjs.svg' },
  { id: 5, img: '/tech/typescript.svg' },
  { id: 6, img: '/tech/vercel.svg' },
]

const pairOfArrayCards: Card[] = [...initialArrayCards, ...initialArrayCards]

const CARD_BACK = '/favicon.png'

const shuffle = (array: Card[]): Card[] => {
  let currentIndex = array.length
  let temporaryValue: Card
  let randomIndex: number

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

const GamePage: React.FC = () => {
  const [arrayCards, setArrayCards] = useState<Card[]>([])
  const [openedCards, setOpenedCards] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState<number>(0)
  const [disableClicks, setDisableClicks] = useState(false)

  useEffect(() => {
    setArrayCards(shuffle([...pairOfArrayCards]))
  }, [])

  const handleCardClick = (index: number) => {
    if (disableClicks) return
    if (openedCards.includes(index) || matched.includes(arrayCards[index].id)) return
    if (openedCards.length === 2) return

    const newOpened = [...openedCards, index]
    setOpenedCards(newOpened)

    if (newOpened.length === 2) {
      setMoves((prev) => prev + 1)
      const firstIndex = newOpened[0]
      const secondIndex = newOpened[1]

      if (arrayCards[firstIndex].id === arrayCards[secondIndex].id) {
        setMatched((prev) => [...prev, arrayCards[firstIndex].id])
        setOpenedCards([])
      } else {
        setDisableClicks(true)
        setTimeout(() => {
          setOpenedCards([])
          setDisableClicks(false)
        }, 1200)
      }
    }
  }

  const restartGame = () => {
    setMatched([])
    setOpenedCards([])
    setMoves(0)
    setArrayCards(shuffle([...pairOfArrayCards]))
  }

  const isGameOver = matched.length === initialArrayCards.length

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto p-6 bg-light-hover rounded-2xl shadow-2xl select-none">
      <h1 className="text-4xl font-extrabold mb-8 text-accent drop-shadow-md">Memory Pairs Game</h1>
      <p className="mb-6 text-accent-hover font-semibold tracking-wide text-lg">
        Сделано ходов: <span className="text-accent text-2xl">{moves}</span>
      </p>

      <div className="grid grid-cols-4 gap-5 w-full">
        {arrayCards.map((card, index) => {
          const isFlipped = openedCards.includes(index) || matched.includes(card.id)
          const isMatched = matched.includes(card.id)

          return (
            <div
              key={index}
              className="relative w-[110px] h-[110px] perspective"
              onClick={() => handleCardClick(index)}
            >
              <div
                className={`relative w-full h-full duration-700 rounded-xl shadow-lg
                  ${isMatched ? 'shadow-[0_0_15px_4px_rgba(99,102,241,0.6)]' : 'shadow-lg'}`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div
                  className="absolute w-full h-full bg-light-hover rounded-xl flex items-center justify-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <Image
                    src={card.img}
                    alt={`card-${card.id}`}
                    width={72}
                    height={72}
                    unoptimized
                    draggable={false}
                    className="select-none pointer-events-none"
                  />
                </div>
                <div
                  className="absolute w-full h-full bg-accent rounded-xl flex items-center justify-center rotate-y-180"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <Image
                    src={CARD_BACK}
                    alt="card-back"
                    width={48}
                    height={48}
                    unoptimized
                    draggable={false}
                    className="opacity-80 select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {isGameOver && (
        <div className="mt-10 p-6 bg-indigo-300 rounded-xl text-accent font-bold text-center shadow-md max-w-xs animate-fade-in">
          Игра завершена за <span className="text-accent">{moves}</span> ходов.
          <button
            onClick={restartGame}
            className="mt-4 px-5 py-2 bg-accent text-light rounded-lg hover:bg-accent-hover transition"
          >
            Играть заново
          </button>
        </div>
      )}
    </div>
  )
}

export default GamePage
