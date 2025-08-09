'use client'

import Stack from '@/components/blocks/games/Stack'
import Commit from '@/components/blocks/games/Commit'
import Slider from '@/components/blocks/games/Slider'
import PortfolioSlider from '@/components/blocks/games/Slider'
import Tabs from '@/components/ui/Tabs'

export default function HomePage() {
  return (
    <Tabs
      initialTab="Welcome"
      tabs={[
        {
          label: 'Welcome',
          content: (
            <div className="flex flex-col h-full">
              <div className="flex flex-col w-fit mx-auto">
                <h1 className="text-4xl lg:text-8xl bg-accent text-light w-fit rounded-tr-3xl">
                  Welcome
                </h1>
                <p className="text-light text-md lg:text-lg">
                  this is my playground site where I experiment, build features, and let you learn
                  more about me as a person.
                </p>
                <p className="bg-light text-dark rounded-bl-lg w-fit self-end text-md lg:text-xl p-0">
                  There many interactive buttons in this playground, try to find all
                </p>
              </div>
              <div className="flex-1 bg-dark">
                <PortfolioSlider />
              </div>
            </div>
          ),
        },
        { label: 'Tech Stack', content: <Stack /> },
        { label: 'Commits', content: <Commit /> },
      ]}
    />
  )
}
