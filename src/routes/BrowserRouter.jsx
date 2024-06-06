import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../pages/login/Login'
import Registrasi from '../pages/registrasi/Registrasi'
import MainLayout from '../layouts/MainLayout'
import DiscussionDetail from '../pages/discussion_detail/DiscussionDetail'

const routes = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Registrasi />
    },
    {
        path: '/discussion/:discussion_id',
        element: <DiscussionDetail />
    },
    {
        path: '',
        element: <MainLayout />,
        children: [
            {
                path: 'home',
                element: <></>
            }
        ]
    }
])

const BrowserRouter = () => {
    return <RouterProvider router={routes} />
}

export default BrowserRouter