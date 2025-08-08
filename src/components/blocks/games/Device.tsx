import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import SectionTitle from '@/components/ui/SectionTitle'
import LongCard from '@/components/ui/LongCard'

type Devices = {
  id: string
  title: string
  image: string
}

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
      <div className=" flex flex-col lg:flex-row gap-2 lg:gap-12 justify-center sm:justify-start items-center">
        <SectionTitle>My Devices</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {device.map(item => (
            <LongCard key={item.id} title={item.title} image={item.image} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Device
