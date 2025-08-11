'use client'

import { useEffect, useRef, useState } from 'react'
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

  const channelRef = useRef<any | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // проверка на сессию
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setCurrentUserId(data.session?.user.id ?? null)
    })
  }, [])

  // запрос на список юзеров
  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from('profiles').select('id, full_name')
      if (!error) {
        setUsers(data ?? [])
      }
    }
    fetchUsers()
  }, [])

  // запрос на сообщения у определенных юзеров
  useEffect(() => {
    if (!currentUserId || !selectedUser) {
      setMessages([])
      return
    }

    let mounted = true
    async function fetchMessages() {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(
          `and(sender_id.eq.${currentUserId},receiver_id.eq.${selectedUser?.id}),and(sender_id.eq.${selectedUser?.id},receiver_id.eq.${currentUserId})`
        )
        .order('created_at', { ascending: true })

      if (!error && mounted) {
        setMessages(data ?? [])
        scrollToBottom()
      }
    }

    fetchMessages()
    return () => {
      mounted = false
    }
  }, [currentUserId, selectedUser])

  // realtime
  useEffect(() => {
    if (!currentUserId) return

    if (channelRef.current) {
      channelRef.current.unsubscribe()
      channelRef.current = null
    }

    const channel = supabase
      .channel(`messages-realtime-${currentUserId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        const msg = payload.new as Message
        if (msg.sender_id === currentUserId || msg.receiver_id === currentUserId) {
          if (
            selectedUser &&
            ((msg.sender_id === currentUserId && msg.receiver_id === selectedUser.id) ||
              (msg.sender_id === selectedUser.id && msg.receiver_id === currentUserId))
          ) {
            setMessages(prev => {
              if (prev.some(m => m.id === msg.id)) return prev
              return [...prev, msg]
            })
            scrollToBottom()
          }
        }
      })
      .subscribe()

    channelRef.current = channel

    return () => {
      channel.unsubscribe()
      channelRef.current = null
    }
  }, [currentUserId, selectedUser])

  // скролл к нижним сообщениям
  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const sendMessage = async () => {
    if (!currentUserId || !selectedUser || input.trim() === '') return

    const { data, error } = await supabase
      .from('messages')
      .insert([{ sender_id: currentUserId, receiver_id: selectedUser.id, content: input.trim() }])
      .select()
      .single()

    if (!error && data) {
      setMessages(prev => {
        if (prev.some(m => m.id === data.id)) return prev
        return [...prev, data as Message]
      })
      setInput('')
      scrollToBottom()
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
    <div className="h-full p-4">
      <div className="md:flex md:h-full md:gap-4">
        <div className={`md:w-64 md:overflow-y-auto ${showChat ? 'hidden' : 'block'} md:block`}>
          <h2 className="bg-accent text-center text-light text-lg rounded-t-lg">Users</h2>
          {users.filter(u => u.id !== currentUserId).length === 0 && <div>Пользователей нет</div>}
          <ul className="bg-alt">
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
                  {user.full_name ? user.full_name.split('@')[0] : user.id}
                </li>
              ))}
          </ul>
        </div>
        <div
          className={`md:flex-1 md:flex md:flex-col bg-transparent  md:rounded-lg  ${showChat ? 'block' : 'hidden'} md:block`}
        >
          <div className="flex items-center mb-4 md:hidden">
            <button
              onClick={onBack}
              className="text-light bg-accent px-4 py-2 rounded-xl font-semibold mr-4"
              aria-label="Назад к списку пользователей"
            >
              Назад
            </button>
            <h2 className="text-xl font-bold text-light ml-auto">
              {selectedUser ? `Chat ${selectedUser.full_name ?? selectedUser.id}` : 'Select user'}
            </h2>
          </div>

          {!selectedUser && (
            <div className="md:flex hidden text-light text-xl h-110 w-full justify-center items-center">
              Select a user to start a conversation
            </div>
          )}

          {selectedUser && (
            <>
              <div className="flex-1 max-h-110 h-120 overflow-y-auto border p-2 rounded mb-4 bg-dark-hover">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`mb-2 py-2 px-4 rounded-2xl max-w-xs break-words ${msg.sender_id === currentUserId ? 'bg-dark text-light ml-auto' : 'bg-light-hover text-dark'}`}
                  >
                    <div>{msg.content}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {new Date(msg.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  className="flex-1 border outline-none bg-light-hover rounded px-2 py-1"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Введите сообщение..."
                />
                <button
                  onClick={sendMessage}
                  className="bg-accent text-white px-4 rounded hover:bg-accent-hover disabled:opacity-50 cursor-pointer"
                  disabled={input.trim() === ''}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
