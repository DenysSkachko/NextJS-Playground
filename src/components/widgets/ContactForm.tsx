'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const schema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(1, 'Enter your name'),
  message: z.string().min(10, 'Minimum 10 characters'),
})

type FormData = z.infer<typeof schema>

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.from('contacts').insert([data])

    if (error) {
      toast.error('Submission failed. Please try again later.') 
    } else {
      toast.success('Message sent successfully!')
      reset()
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        icon={false}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto p-4 bg-white shadow-md rounded-2xl flex flex-col gap-2"
      >
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full p-2 rounded bg-dark text-light focus:bg-accent transition-all duration-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full bg-dark text-light focus:bg-accent p-2 rounded transition-all duration-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            {...register('message')}
            className="w-full bg-dark text-light focus:bg-accent p-2 rounded h-32 transition-all duration-500 resize-none"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-hover hover:scale-105 cursor-pointer transition-all duration-500"
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </>
  )
}

export default ContactForm
