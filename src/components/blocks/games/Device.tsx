import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import SectionTitle from '@/components/ui/SectionTitle'
import LongCard from '@/components/ui/LongCard'
import Image from 'next/image'

type Devices = {
  id: string
  title: string
  image: string
}

const upgradeDevice = [
  { id: 1, title: 'Razer Kiyo', image: '/device/cam.jpg' },
  { id: 2, title: 'HyperX Quadcast S', image: '/device/mic.jpg' },
  { id: 3, title: 'HyperX Alloy Elite', image: '/device/key.jpg' },
  { id: 4, title: 'Logitech G PRO', image: '/device/mouse.jpg' },
  { id: 5, title: 'RAZER Blackshark V3', image: '/device/head.jpg' },
]

const Device = () => {
  const [device, setDevice] = useState<Devices[]>([])
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true
    const fetchDevice = async () => {
      const { data, error } = await supabase.from('devices').select('*')

      if (error) {
        console.error('error', error)
      } else {
        setDevice(data || [])
      }
    }
    fetchDevice()
  }, [])

  if (!device.length) {
    return (
      <div className="text-3xl text-light flex justify-center items-center my-auto">Loading...</div>
    )
  }

  return (
    <>
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex flex-col gap-4 justify-center lg:justify-start items-center lg:items-start mx-auto">
          <h2 className="bg-light text-dark text-4xl w-full">My actual devices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {device.map(item => (
              <LongCard key={item.id} title={item.title} image={item.image} />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-dark border border-accent divide-y divide-accent rounded-b-lg mx-auto w-full">
          <h2 className="bg-accent text-light text-4xl w-full text-right">goal to upgrade</h2>
          {upgradeDevice.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center justify-end gap-4 p-3 ${
                index % 2 === 1 ? 'bg-accent' : ''
              }`}
            >
              <span className="text-light">{item.title}</span>
              <div className="flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="rounded-md object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Device
