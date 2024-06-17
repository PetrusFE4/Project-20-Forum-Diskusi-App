import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Login from '../pages/login/Login'
import Registrasi from '../pages/registrasi/Registrasi'
import Forgetpassword from '../pages/forgetpassword/ForgetPassword'
import MainLayout from '../layouts/MainLayout'
import About from '../routes/About'
import Contact from '../routes/Contact'
import Home from '../pages/testing_layout/Home'
import Communities from '../pages/testing_layout/Communities'
import CreatePost from '../pages/testing_layout/CreatePost'
import PostDetail from '../pages/testing_layout/PostDetail'
import Community from '../pages/testing_layout/Community'

const routes = createBrowserRouter([
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/contact',
        element: <Contact />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Registrasi />
    },
    {
        path: '/forgetpassword',
        element: <Forgetpassword />
    },
    {
        path: '',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'community',
                element: <Communities />
            },
            {
                path: 'community/:community_id',
                element: <Community />
            },
            {
                path: 'create-post',
                element: <CreatePost />
            },
            {
                path: 'post/:post_id',
                element: <PostDetail />
            },
            {
                path: 'post/:post_id/:reply_id',
                element: <PostDetail />
            },
            {
                path: 'search',
                element: <></>
            },
            {
                path: 'notification'
            },
            {
                path: 'saved-post'
            },
            {
                path: 'profile'
            }
        ]
    }
])


const BrowserRouter = () => {
    return <RouterProvider router={routes} />
}

export default BrowserRouter