'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'

type FoodItem = {
  id: string
  title: string
  image: string
  type: string
}

const categories = ['food', 'drink', 'dessert', 'snacks', 'fruits']

const Food = () => {
  const [food, setFood] = useState<FoodItem[]>([])

  useEffect(() => {
    const fetchFood = async () => {
      const { data, error } = await supabase.from('food').select('*')
      if (error) {
        console.error('error', error)
      } else {
        setFood(data || [])
      }
    }
    fetchFood()
  }, [])

  if (!food.length) {
    return (
      <div className="text-3xl text-light flex justify-center items-center my-auto">Loading...</div>
    )
  }

  return (
    <>
      <SectionTitle>Favorite Food</SectionTitle>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start mx-auto">
        {categories.map(category => {
          const filtered = food.filter(item => item.type === category)
          if (!filtered.length) return null

          return (
              <div key={category} className="flex flex-col">
                <h2 className="w-full bg-light border-1 border-dark rounded-md text-center my-1">{category}</h2>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  {filtered.map(item => (
                  <FoodCard key={item.id} item={item} />
                ))}
                </div>
              </div>
          )
        })}
      </div>
    </>
  )
}

const FoodCard = ({ item }: { item: FoodItem }) => (
  <div className="relative w-[150px] h-[100px] px-2 pt-5 pb-2 text-center text-light/50 rounded-lg group hover:scale-105 transition-all duration-300 cursor-pointer">
    <h3 className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-dark-hover py-[1px] px-3 whitespace-nowrap rounded-sm z-10">
      {item.title}
    </h3>
    <Image
      src={item.image}
      alt={item.title}
      fill
      sizes="(max-width: 640px) 100vw, 120px"
      className="object-cover rounded-lg"
    />
  </div>
)

export default Food
