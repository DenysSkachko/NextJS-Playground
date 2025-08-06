'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import MarqueeBackground from '@/components/MarqueeBackground'
import InputAuth from '@/components/ui/InputAuth'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async () => {
    setError(null)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return setError(error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) return setError(error.message)
    }

    router.push('/')
  }

  const handleGoogle = async () => {
    const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    const redirectTo = isLocalhost
      ? 'http://localhost:3000/'
      : 'https://proxima-playground.vercel.app/'

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    })

    if (error) setError(error.message)
  }

  return (
    <div className="min-h-screen min-w-screen relative bg-accent overflow-hidden flex items-center justify-center">
      <MarqueeBackground />

      <div className="relative z-10 bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
        <div className="flex mb-4">
          <button
            className={`flex-1 p-2 rounded-l cursor-pointer ${
              mode === 'login' ? 'bg-dark text-light hover:bg-dark-hover' : 'bg-light'
            }`}
            onClick={() => setMode('login')}
          >
            Вход
          </button>
          <button
            className={`flex-1 p-2 rounded-r cursor-pointer ${
              mode === 'register'
                ? 'bg-dark text-light hover:bg-dark-hover'
                : 'bg-light hover:bg-light-hover'
            }`}
            onClick={() => setMode('register')}
          >
            Регистрация
          </button>
        </div>

        <InputAuth
          type="email"
          id={'emailInput'}
          label={'Email:'}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <InputAuth
          type="password"
          id={'passwordInput'}
          label={'Password:'}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p className="text-accent-hover text-sm mb-2">{error}</p>}
        <button
          onClick={handleSubmit}
          className="transition-all duration-300 hover:scale-105 w-full bg-dark text-light hover:bg-dark-hover p-2 rounded mb-3 cursor-pointer"
        >
          {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
        <button
          onClick={handleGoogle}
          className="transition-all duration-300 hover:scale-105 w-full bg-accent text-light hover:bg-accent-hover p-2 rounded cursor-pointer"
        >
          Войти через Google
        </button>
      </div>
    </div>
  )
}
