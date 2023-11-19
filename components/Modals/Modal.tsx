"use client"

import React, { FormEvent, Fragment } from 'react'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import { AddUserEmailToProduct } from '@/lib/actions'

interface Props {
  productId: string
}

const Modal = ({ productId }: Props) => {
  let [isOpen, setIsOpen] = useState(true)

  const [isSubmitting, setisSubmitting] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSubmitting(true)

    await AddUserEmailToProduct(productId, email)

    setisSubmitting(false)
    setEmail('')
    closeModal()
  }

  const openModal = () => setIsOpen(true)

  const closeModal = () => setIsOpen(false)

  return (
    <>
      <button className='btn' type='button' onClick={openModal}>
        track
      </button>
      <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" open={isOpen} onClose={closeModal} className="dialog-container">
            <div className="min-h-screen px-4 text-center">
              <Transition.Child 
                as={Fragment} 
                enter="ease-out duration-300" 
                enterFrom="opacity-0" 
                enterTo='opacity-100' 
                leave='ease-in duration-200' 
                leaveFrom='opacity-100' 
                leaveTo='opacity-0'>
                <Dialog.Overlay className="fixed inset-0"/>
              </Transition.Child>
              <span className='inline-block h-screen align-middle' arian-hidden="true"/>
              <Transition.Child 
                as={Fragment} 
                enter='ease-out duration-300' 
                enterFrom="opacity-0 scale-95" 
                enterTo='opacity-100 scale-100' 
                leave="ease-in duration-200" 
                leaveFrom='opacity-100 scale-100' 
                leaveTo='opacity-0 scale-95'>
                  <div className='dialog-content'>
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                          <div className='p-3 border border-gray-200 rounded-10 '>
                            <Image
                              src="/assets/icons/logo.svg"
                              alt="logo"
                              width={28}
                              height={28}
                              />
                          </div>
                          <Image
                            src="/assets/icons/x-close.svg"
                            alt='close'
                            width={24}
                            height={24}
                            className='cursor-pointer'
                            onClick={closeModal}
                          />
                        </div>
                        <h4 className='dialog-head_text'>Stay updated about new products or pricing alerts in your inbox</h4>
                        <p className='text-sm text-gray-600 mt-2'>never miss the oportunity of being part of us:)</p>
                        <form action="" className='flex flex-col mt-5' onSubmit={handleSubmit}>
                          <label htmlFor="email" className='text-sm font-medium text-gray-700'>
                            Email Address
                          </label>
                          <div className='dialog-input_container'>
                            <Image
                              src="/assets/icons/mail.svg"
                              alt='emial'
                              width={18}
                              height={18}
                            />

                            <input 
                            required 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id='email' 
                            placeholder='Email Address' 
                            className='dialog-input '/>
                          </div>
                          <button type='submit' className='dialog-btn'>{isSubmitting ? 'Submitting' : 'Track'}</button>
                        </form>
                    </div>
                  </div>
              </Transition.Child>
            </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
