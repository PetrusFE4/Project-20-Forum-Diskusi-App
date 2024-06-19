import React, { useContext } from 'react'
import { NotificationContext } from '../../contexts/NotificationContext'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Notification = () => {
    const { notification, setNotification } = useContext(NotificationContext)

    return (
        <div className="">
            {notification ? notification.map((item, index) => (
                <Link to={`/post/${item._post}`}>
                    <div className="p-2 border bg-white flex flex-row items-center">
                        <img className='w-12 h-12 rounded-full mr-4' src={item.poster.profile_picture != null ? import.meta.env.VITE_CDN + 'uploads/user/' + item.poster.profile_picture : import.meta.env.VITE_CDN + 'uploads/user/default_profile.png'} alt="" />
                        <div className="flex flex-col">
                            <span className='break-words'>{item.message}</span>
                            <span className='text-sm'>{moment.utc(item.timestamp).startOf('minute').fromNow()}</span>
                        </div>
                    </div>
                </Link>
            )) : <div>No notification</div>}
        </div>
    )
}

export default Notification