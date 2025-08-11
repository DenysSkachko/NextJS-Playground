import { div } from 'framer-motion/client'
import React from 'react'

interface SmallCardsProps {
  label: string
  value: any
  icon?: React.ReactNode
}

const SmallCards = ({ label, value, icon }: SmallCardsProps) => {
  return (
    <div className="w-full group ">
      <h2 className="bg-accent py-[1px] px-3  text-left group-hover:text-center whitespace-nowrap transition-all duration-1000">
        {label}
      </h2>
      <div className="relative bg-light w-100 px-2 p-2 text-center text-light/50   group-hover:w-full group-hover:text-2xl transition-all duration-500">
        <p className="text-dark "> {value} </p>
        {icon && (
          <span className="absolute -top-2 right-2 hover:scale-125 transition-all duration-300">
            {icon}
          </span>
        )}
      </div>
    </div>
  )
}

export default SmallCards
