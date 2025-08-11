import Image from 'next/image'
import React from 'react'

const educationData = [
  {
    title: 'Gymnasium No. 152',
    subtitle: 'Secondary Education',
    period: '2006–2017',
    image: '/gim.jpg',
  },
  {
    title: 'KhNEU Bachelor',
    subtitle: "Bachelor's Degree",
    period: '2017–2021',
    image: '/hneu.jpg',
  },
  {
    title: 'KhNEU Master',
    subtitle: "Master's Degree",
    period: '2021–2023',
    image: '/hneu.jpg',
  },
]

export default function EducationSection() {
  return (
    <section className="px-4  text-light">
      <ul className="grid grid-cols-3 gap-2 w-full">
        {educationData.map((item, index) => (
          <li
            key={index}
            className="relative h-50 flex justify-between items-center bg-dark border border-accent rounded-lg overflow-hidden group"
          >
            {/* Оверлей с текстом */}
            <div className="absolute inset-0 z-20 bg-black/60 flex flex-col justify-between p-4 text-white opacity-100 group-hover:opacity-0 transition-opacity duration-500">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-accent">{item.subtitle}</p>
              </div>
              <span className="text-xs bg-accent text-dark px-2 py-1 rounded">{item.period}</span>
            </div>

            {/* Фоновое изображение */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
