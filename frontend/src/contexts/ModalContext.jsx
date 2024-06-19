import React, { createContext, useState } from 'react'

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
            <div onClick={hideModal} className={`fixed inset-0 bg-black flex items-center justify-center z-40 transition-opacity duration-500 ${isVisible ? 'opacity-50 visible' : 'opacity-0 invisible'}`} />
            <div className={`fixed w-dvw h-dvh shadow-2xl inset-0 flex items-center justify-center z-50 transition-all duration-500 ${isVisible ? 'visible opacity-100 translate-y-0' : 'collapse opacity-0 translate-y-[-50px]'}`}>
                {modal != null ? (
                    modal
                ) : ''}
            </div>
        </ModalContext.Provider>
    )
}