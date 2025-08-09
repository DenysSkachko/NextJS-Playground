'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import SmallCards from '@/components/ui/SmallCards'
import { IoMdMale } from 'react-icons/io'
import SectionTitle from '@/components/ui/SectionTitle'

type Profile = {
  id: number
  first_name: string
  last_name: string
  middle_name: string
  country: string
  city: string
  birthdate: string
  gender: string
}

const ua = (
  <Image
    src="/ua.png"
    alt="Ukraine flag"
    width={25}
    height={20}
    style={{ width: '25px', height: '20px' }}
    className="rounded-sm"
  />
)

const Main = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchProfile = async () => {
      const { data, error } = await supabase.from('profile').select('*').limit(1)

      if (error) {
        console.error('error', error)
      } else {
        setProfile(data[0])
      }
    }
    fetchProfile()
  }, [])

  if (!profile) {
    return (
      <div className="text-3xl text-light flex justify-center items-center my-auto">
        {' '}
        Loading...
      </div>
    )
  }
  return (
    <>
      <div className="flex flex-col md:flex-row h-full py-10 gap-4 justify-center items-center border border-accent">
        {/* <div className=" relative w-[200px] h-[200px] overflow-hidden rounded-xl">
          <Image
            src="/avatar.png"
            alt="Моё фото"
            priority
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-cover object-center contrast-80 hover:contrast-100 hover:scale-125 transition-all duration-500"
          />
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-center">
          <SmallCards label="First Name" value={profile.first_name} />
          <SmallCards label="Last Name" value={profile.last_name} />
          <SmallCards label="Middle Name" value={profile.middle_name} />
          <SmallCards label="Country" value={profile.country} icon={ua} />
          <SmallCards label="City" value={profile.city} icon={ua} />
          <SmallCards
            label="Gender"
            value={profile.gender}
            icon={<IoMdMale className="text-light bg-accent rounded-3xl p-1 text-2xl" />}
          />
          <SmallCards label="BirthDate" value={profile.birthdate} />
        </div>
      </div>
    </>
  )
}

export default Main
