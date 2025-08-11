import { div } from 'framer-motion/client'
import React from 'react'

interface SmallCardsProps {
  label: string
  value: any
  icon?: React.ReactNode
}

const SmallCards = ({ label, value, icon }: SmallCardsProps) => {
  return (
    <div className="w-full sm:w-1/2 p-2">
      <div className="group rounded-lg bg-dark-hover shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        
        <div className="flex items-center justify-between bg-accent px-3 py-1">
          <h2 className="text-sm font-medium tracking-wide text-dark transition-all duration-500 group-hover:tracking-wider">
            {label}
          </h2>
          {icon && (
            <span className="text-dark/50 group-hover:scale-110 transition-transform duration-300">
              {icon}
            </span>
          )}
        </div>

        <div className="px-4 py-3 text-center">
          <p className="text-base font-semibold text-light">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default SmallCards
