'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

type FoodItem = {
  id: string
  title: string
  image: string
  type: string
}

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

  const foods = food.filter(item => item.type === 'food')
  const drinks = food.filter(item => item.type === 'drink')
  const desserts = food.filter(item => item.type === 'dessert')
  const snacks = food.filter(item => item.type === 'snacks')
  const fruits = food.filter(item => item.type === 'fruits')

  return (
    <div className="flex flex-wrap gap-5">
      {foods.length > 0 && (
          <div className="">
            {foods.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
      )}

      {desserts.length > 0 && (
          <div >
            {desserts.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
      )}

      {drinks.length > 0 && (
          <div >
            {drinks.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
      )}

      {snacks.length > 0 && (
          <div >
            {snacks.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
      )}

      {fruits.length > 0 && (
          <div >
            {fruits.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
      )}
    </div>
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
