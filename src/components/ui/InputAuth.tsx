'use client'

import React, { InputHTMLAttributes } from 'react'

interface InputAuthProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
}

export default function InputAuth({ label, id, className, ...rest }: InputAuthProps) {
  return (
    <div className="relative group mb-4">
      <input


        id={id}
        placeholder=" "
        className={`
          peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 bg-light rounded
          focus:border-transparent focus:ring-1 focus:ring-dark/50 focus:outline-none
          transition-all duration-300 delay-200 placeholder-transparent
          ${className ?? ''}
        `}
        {...rest}
      />
      <label
        htmlFor={id}
        className="
          absolute left-6 top-1.5 text-sm font-bold text-dark
          transition-all duration-200 ease-in-out
          peer-focus:top-1
          peer-focus:text-sm
          peer-focus:text-dark-hover/30
          peer-focus:font-semibold
          cursor-text
        "
      >
        {label}
      </label>
    </div>
  )
}
