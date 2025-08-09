'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import SectionTitle from '@/components/ui/SectionTitle'

type User = {
  id: string
  full_name: string | null
}

type Message = {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
}

export default function Chat() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [showChat, setShowChat] = useState(false)

  const channelRef = useRef<any | null>(null)
  const mountedRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setCurrentUserId(data.session?.user.id ?? null)
      console.log('Current user id:', data.session?.user.id)
    })
  }, [])

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from('profiles').select('id, full_name')
      if (error) {
        console.error('Ошибка загрузки пользователей:', error)
        return
      }
      setUsers(data ?? [])
      console.log('Users loaded:', data?.length)
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    if (!currentUserId || !selectedUser) {
      setMessages([])
      return
    }

    let mounted = true
    async function fetchMessages() {
      try {
        const senderId = currentUserId
        const receiverId = selectedUser!.id

        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .or(
            `and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`
          )
          .order('created_at', { ascending: true })

        if (error) {
          console.error('Ошибка загрузки сообщений:', error)
          return
        }
        if (!mounted) return
        setMessages(data ?? [])
        scrollToBottom()
        console.log('History loaded, messages:', data?.length)
      } catch (err) {
        console.error('fetchMessages error', err)
      }
    }

    fetchMessages()
    return () => {
      mounted = false
    }
  }, [currentUserId, selectedUser])

  useEffect(() => {
    if (!currentUserId) return

    if (channelRef.current) {
      try {
        channelRef.current.unsubscribe()
      } catch (e) {
      }
      channelRef.current = null
    }

    const channel = supabase.channel('messages-realtime-channel')

    console.log('Subscription requested')

    channel
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload: any) => {
          console.log('Realtime payload raw:', payload)
          const msg = payload.new as Message
          if (!selectedUser || !currentUserId) return

          const belongsToChat =
            (msg.sender_id === currentUserId && msg.receiver_id === selectedUser.id) ||
            (msg.sender_id === selectedUser.id && msg.receiver_id === currentUserId)

          if (belongsToChat) {
            setMessages(prev => {
              if (prev.some(m => m.id === msg.id)) return prev
              return [...prev, msg]
            })
            scrollToBottom()
            console.log('Realtime appended message id=', msg.id)
          } else {
            console.log('Realtime message not for current chat, ignore')
          }
        }
      )
      .subscribe((status, err) => {
        console.log('Subscription status:', status)
        if (err) console.error('Subscription error:', err)
      })

    channelRef.current = channel

    return () => {
      try {
        channel.unsubscribe()
        console.log('Unsubscribed from realtime')
      } catch (e) {

      }
      channelRef.current = null
    }
  }, [currentUserId])

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const sendMessage = async () => {
    if (!currentUserId || !selectedUser || input.trim() === '') return

    const content = input.trim()

    const { data, error } = await supabase.from('messages').insert([
      { sender_id: currentUserId, receiver_id: selectedUser.id, content }
    ]).select().single()

    if (error) {
      console.error('Ошибка отправки сообщения:', error)
      return
    }

    const msg = data as Message
    setMessages(prev => {
      if (prev.some(m => m.id === msg.id)) return prev
      return [...prev, msg]
    })
    setInput('')
    scrollToBottom()
  }

  const onSelectUser = (user: User) => {
    setSelectedUser(user)
    setShowChat(true)
  }

  const onBack = () => {
    setShowChat(false)
    setSelectedUser(null)
    setMessages([])
  }

  return (
    <div className="h-full max-h-150 p-4">
      <div className="md:flex md:h-full md:gap-4">
        <div className={`md:w-64  md:overflow-y-auto ${showChat ? 'hidden' : 'block'} md:block`}>
          <h2 className="bg-accent text-center text-light text-lg rounded-t-lg">Users</h2>
          {users.filter(u => u.id !== currentUserId).length === 0 && <div>Пользователей нет</div>}
          <ul className="bg-alt">
            {users.filter(user => user.id !== currentUserId).map(user => (
              <li key={user.id} className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedUser?.id === user.id ? 'bg-gray-300 font-semibold' : ''}`} onClick={() => onSelectUser(user)}>
                {user.full_name ?? user.id}
              </li>
            ))}
          </ul>
        </div>

        <div className={`md:flex-1 md:flex md:flex-col bg-transparent md:bg-alt md:rounded-lg md:p-4 ${showChat ? 'block' : 'hidden'} md:block`}>
          <div className="flex items-center mb-4 md:hidden">
            <button onClick={onBack} className="text-light bg-accent px-4 py-2 rounded-xl font-semibold mr-4" aria-label="Назад к списку пользователей">Назад</button>
            <h2 className="text-xl font-bold text-light ml-auto">{selectedUser ? `Chat ${selectedUser.full_name ?? selectedUser.id}` : 'Select user'}</h2>
          </div>

          {!selectedUser && <div className="md:flex hidden text-dark text-xl h-full w-full  justify-center items-center">Select a user to start a conversation</div>}

          {selectedUser && (
            <>
              <div className="flex-1 max-h-150 min-h-100 h-full overflow-y-auto border p-2 rounded mb-4 bg-dark-hover">
                {messages.map(msg => (
                  <div key={msg.id} className={`mb-2 py-2 px-4 rounded-2xl max-w-xs break-words ${msg.sender_id === currentUserId ? 'bg-dark text-light ml-auto' : 'bg-light-hover text-dark'}`}>
                    <div>{msg.content}</div>
                    <div className="text-xs text-gray-600 mt-1">{new Date(msg.created_at).toLocaleString()}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input type="text" className="flex-1 border outline-none bg-light-hover rounded px-2 py-1" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendMessage() }} placeholder="Введите сообщение..." />
                <button onClick={sendMessage} className="bg-accent text-white px-4 rounded hover:bg-accent-hover disabled:opacity-50 cursor-pointer" disabled={input.trim() === ''}>Send</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
