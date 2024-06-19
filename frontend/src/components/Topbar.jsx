import React from 'react'
import { PiGearThin } from "react-icons/pi"

const Topbar = () => {
    return (
        <div className="w-full h-full flex flex-row px-8 justify-between items-center border-t">
            <div className="h-6 w-6"></div>
            {/* <div className="">
                <CiHome size='24' color='rgb(107 114 128)' />
            </div>
            <div className="">
                <CiSearch size='24' color='rgb(107 114 128)' />
            </div> */}
            <div className="">
                <h1>{document.title}</h1>
            </div>
            {/* <div className="">
                <CiBellOn size='24' color='rgb(107 114 128)' />
            </div> */}
            <div className="">
                {/* <PiGearThin size='24' color='rgb(107 114 128)' /> */}
            </div>
        </div>
    )
}

export default Topbar