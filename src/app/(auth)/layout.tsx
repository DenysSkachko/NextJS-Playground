'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import UserBadge from '@/components/widgets/UserBadge'
import Logo from '@/components/Logo'
import { BackgroundProvider } from '@/context/BackgroundContext'
import BackgroundToggleButton from '@/components/widgets/BackgroundToggleButton'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login')
      } else {
        setUserEmail(session.user.email ?? null)
        setLoading(false)
      }
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return null

  return (
    <BackgroundProvider>
      <main className="flex min-h-screen w-screen items-center justify-center px-0 sm:px-10 pt-30 sm:pb-10">
        <div className="relative z-10 flex h-full w-full sm:rounded-4xl bg-alt shadow-xl accent p-4 sm:p-10 pt-15 sm:pt-25 xl:h-[750px] 2xl:w-[1350px]">
          <Header />

          <div className="relative w-full rounded-xl sm:rounded-3xl bg-dark px-4 sm:px-10 py-8">
            {children}
          </div>

          <UserBadge email={userEmail} onLogout={handleLogout} />

          <Logo />
        </div>

        <BackgroundToggleButton />
      </main>
    </BackgroundProvider>
  )
}
