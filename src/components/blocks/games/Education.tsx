import React from 'react'

const educationData = [
  {
    title: 'Gymnasium No. 152',
    subtitle: 'Secondary Education',
    period: '2006–2017',
  },
  {
    title: 'KhNEU Bachelor',
    subtitle: "Bachelor's Degree",
    period: '2017–2021',
  },
  {
    title: 'KhNEU Master',
    subtitle: "Master's Degree",
    period: '2021–2023',
  },
  {
    title: 'Driving License',
    subtitle: '7 years experience',
    period: 'Since 2017',
  },
]

export default function EducationSection() {
  return (
    <section className="px-4 py-12 text-light">
      <ul className="grid md:grid-cols-2  gap-2 max-w-md mx-auto">
        {educationData.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-dark border border-accent rounded px-4 py-3"
          >
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-accent">{item.subtitle}</p>
            </div>
            <span className="text-xs bg-accent text-dark px-2 py-1 rounded">
              {item.period}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
