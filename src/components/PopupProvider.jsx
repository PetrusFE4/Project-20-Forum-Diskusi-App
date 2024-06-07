import React, { useState, useEffect, useRef } from 'react'

const PopupProvider = ({ trigger, children, className }) => {
    const ref = useRef()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const handler = event => {
            if (!ref.current?.contains(event.target)) {
                console.log('Outside click detected, closing popup');
                setOpen(false);
            }
        };

        const timer = setTimeout(() => {
            if (open == true)
                window.addEventListener('click', handler);
        }, 0);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('click', handler);
        };
    }, [open]);

    return (
        <>
            <div className='relative' onClick={() => setOpen(true)}>
                {trigger}
                <div ref={ref} className={`absolute min-w-32 ${className} ${open ? 'opacity-100 visible' : 'opacity-0 -z-50 invisible'} transition-all border rounded-md bg-white`}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default PopupProvider