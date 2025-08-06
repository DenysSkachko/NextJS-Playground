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
      <main className="min-h-screen w-screen flex justify-center items-center px-10 pt-30 pb-10">
        <div className="w-full 2xl:w-[1350px] h-full 2xl:h-[750px] bg-alt accent shadow-xl rounded-4xl relative z-10 p-10 pt-25 flex">
          <Header />
          <div className="px-10 py-8 bg-dark rounded-3xl w-full relative">{children}</div>

          <UserBadge email={userEmail} onLogout={handleLogout} />

          <Logo />
        </div>
        <BackgroundToggleButton />
      </main>
    </BackgroundProvider>
  )
}
