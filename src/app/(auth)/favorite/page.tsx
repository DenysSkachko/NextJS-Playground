'use client'

import Films from '@/components/blocks/games/Films'
import Shows from '@/components/blocks/games/Shows'
import Country from '@/components/blocks/games/Country'
import Music from '@/components/blocks/games/Music'
import Food from '@/components/blocks/games/Food'
import Games from '@/components/blocks/games/Games'
import Fan from '@/components/blocks/games/Fan'
import Tabs from '@/components/ui/Tabs'

export default function ServicesPage() {
  return (
    <Tabs
      initialTab="Watch"
      tabs={[
        {
          label: 'Watch',
          content: (
            <>
              <Films />
              <Shows />
            </>
          )
        },
        {
          label: 'Music',
          content: <Music />
        },
        {
          label: 'Country',
          content: <Country onLoaded={() => {}} />
        },
        {
          label: 'Food',
          content: <Food />
        },
        {
          label: 'Fan',
          content: <Fan />
        },
        {
          label: 'Games',
          content: (
            <div className="flex flex-col justify-between h-full gap-4">
              <Games />
            </div>
          )
        }
      ]}
    />
  )
}
