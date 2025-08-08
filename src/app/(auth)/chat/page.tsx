'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

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

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setCurrentUserId(data.session?.user.id ?? null)
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
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    if (!currentUserId || !selectedUser) {
      setMessages([])
      return
    }

    async function fetchMessages() {
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
      setMessages(data ?? [])
    }

    fetchMessages()
  }, [currentUserId, selectedUser])

  useEffect(() => {
    if (!currentUserId || !selectedUser) return

    const channel = supabase
      .channel(`public:messages_${currentUserId}_${selectedUser.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${currentUserId},receiver_id=eq.${selectedUser.id}`,
        },
        payload => {
          console.log('Новое сообщение в realtime (sender -> receiver):', payload)
          setMessages(prev => [...prev, payload.new as Message])
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${selectedUser.id},receiver_id=eq.${currentUserId}`,
        },
        payload => {
          console.log('Новое сообщение в realtime (receiver -> sender):', payload)
          setMessages(prev => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [currentUserId, selectedUser])

  const sendMessage = async () => {
    if (!currentUserId || !selectedUser || input.trim() === '') return

    const { error } = await supabase.from('messages').insert([
      {
        sender_id: currentUserId,
        receiver_id: selectedUser.id,
        content: input.trim(),
      },
    ])

    if (error) {
      console.error('Ошибка отправки сообщения:', error)
    } else {
      setInput('')
    }
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
    <div className="h-screen p-4">
      <div className="md:flex md:h-full md:gap-4">
       
        <div
          className={`
            md:w-64 md:border-r md:border-gray-300 md:overflow-y-auto
            ${showChat ? 'hidden' : 'block'}
            md:block
          `}
        >
          <h2 className="text-xl font-bold mb-4">Пользователи</h2>
          {users.filter(u => u.id !== currentUserId).length === 0 && <div>Пользователей нет</div>}
          <ul>
            {users
              .filter(user => user.id !== currentUserId)
              .map(user => (
                <li
                  key={user.id}
                  className={`p-2 cursor-pointer hover:bg-gray-200 ${
                    selectedUser?.id === user.id ? 'bg-gray-300 font-semibold' : ''
                  }`}
                  onClick={() => onSelectUser(user)}
                >
                  {user.full_name ?? user.id}
                </li>
              ))}
          </ul>
        </div>

        <div
          className={`
            md:flex-1 md:flex md:flex-col md:border md:border-gray-300 md:rounded-lg md:p-4
            ${showChat ? 'block' : 'hidden'}
            md:block
          `}
        >
          <div className="flex items-center mb-4 md:hidden">
            <button
              onClick={onBack}
              className="text-blue-600 font-semibold mr-4"
              aria-label="Назад к списку пользователей"
            >
              ← Назад
            </button>
            <h2 className="text-xl font-bold">
              {selectedUser
                ? `Чат с ${selectedUser.full_name ?? selectedUser.id}`
                : 'Выберите пользователя'}
            </h2>
          </div>

          {!selectedUser && (
            <div className="md:block hidden">Выберите пользователя, чтобы начать переписку</div>
          )}

          {selectedUser && (
            <>
              <div className="flex-1 overflow-y-auto border p-2 rounded mb-4 bg-white">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`mb-2 p-2 rounded max-w-xs ${
                      msg.sender_id === currentUserId ? 'bg-blue-300 ml-auto' : 'bg-gray-300'
                    }`}
                  >
                    <div>{msg.content}</div>
                    <div className="text-xs text-gray-600">
                      {new Date(msg.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 border border-gray-400 rounded px-2 py-1"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') sendMessage()
                  }}
                  placeholder="Введите сообщение..."
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 disabled:opacity-50"
                  disabled={input.trim() === ''}
                >
                  Отправить
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
