import React from 'react'

interface SmallCardsProps {
    label: string;
    value: any;
    icon?: React.ReactNode;
}

const SmallCards = ({label, value, icon}: SmallCardsProps) => {
  return (
   <div className="relative bg-light w-[200px] px-2 pt-5 pb-2 text-center text-light/50 rounded-lg group hover:scale-105 transition-all duration-300">
        <h2 className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dark-hover py-[1px] px-3 whitespace-nowrap rounded-sm">{label}</h2>
        <p className="text-dark "> {value}  </p>
        {icon && <span className="absolute -top-2 right-2 hover:scale-125 transition-all duration-300">{icon}</span>}
      </div>
  )
}

export default SmallCards