import React, { createContext, useState } from 'react'
import { BsXLg } from 'react-icons/bs'

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [modal, setModal] = useState(null)
    const [title, setTitle] = useState('')

    const showModal = (title, modal) => {
        setTitle(title)
        setModal(modal)
        setIsVisible(true)
    }

    const hideModal = () => {
        setIsVisible(false)
    }

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            <div className={`fixed inset-0 bg-black flex items-center justify-center z-40 transition-opacity duration-500 ${isVisible ? 'opacity-50 visible' : 'opacity-0 invisible'}`} />
            <div className={`fixed shadow-2xl inset-0 flex items-center justify-center z-50 transition-all duration-500 ${isVisible ? 'visible opacity-100 translate-y-0' : 'collapse opacity-0 translate-y-[-50px]'}`}>
                <div className="w-10/12 sm:w-1/2 max-h-full bg-white flex flex-col p-4">
                    <div className="flex w-[100%] justify-between text-lg">
                        <div className="">{title}</div>
                        <BsXLg className='cursor-pointer' onClick={hideModal} />
                        {/* <i className='bi bi-x-lg cursor-pointer' onClick={hideModal}></i> */}
                    </div>
                    {modal != null ? (
                        <div className="flex w-[100%] mt-4">
                            {modal}
                        </div>
                    ) : ''}

                </div>
            </div>
        </ModalContext.Provider>
    )
}