import Image from 'next/image'
import { memo } from 'react'
import React from 'react'

type Countries = {
  name: string
  flag: string
  id: string
  cities: string
}

type CountryCardProps = {
  item: Countries
}

const CountryCard = React.memo(({ item }: CountryCardProps) => {
  return (
    <div
      key={item.id}
      className="relative w-[120px] h-[90px] px-2 pt-5 pb-2 text-center text-light/50 rounded-sm group hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <Image
        src={item.flag}
        alt={item.name}
        fill
        sizes="(max-width: 640px) 100vw, 120px"
        className="object-cover rounded-lg z-10 pb-5"
      />
      <p className="text-white z-20 text-sm mt-2 absolute bottom-0 left-0 rounded-b-sm bg-dark-hover w-full px-1">
        {item.name}
      </p>
    </div>
  )
})

export default CountryCard
