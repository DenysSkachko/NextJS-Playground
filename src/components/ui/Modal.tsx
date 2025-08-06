import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  if (!isOpen) return null

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20,  }}
        animate={{ opacity: 1, y: 0, }}
        exit={{ opacity: 0, y: -20,  }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <div
          ref={modalRef}
          className="bg-white rounded-xl shadow-lg h-auto max-w-3xl w-[380px] sm:w-[500px] max-h-[90vh] relative"
        >
          <button
            onClick={onClose}
            className="absolute -top-3 right-0 p-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Close
          </button>

          <div className="p-6">{children}</div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
