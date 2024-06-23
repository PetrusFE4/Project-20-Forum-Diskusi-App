import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Login from '../pages/testing_layout/Login'
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
import EditPost from '../pages/testing_layout/EditPost'
import UserProfilePage from '../pages/testing_layout/UserProfile'
import CreateCommunity from '../pages/testing_layout/CreateCommunity'
import SavedPost from '../pages/testing_layout/SavedPost'
import Activation from '../pages/Auth/Activation'
import Search from '../pages/testing_layout/Search'
import EditCommunity from '../pages/testing_layout/EditCommunity'
import Notification from '../pages/testing_layout/Notification'
import Unactivated from '../pages/Auth/Unactivated'
import Register from '../pages/testing_layout/Register'
import UserSettings from '../pages/testing_layout/UserSettings'

const routes = createBrowserRouter([
    {
        path: '/activate/:token',
        element: <Activation />
    },
    {
        path: '/activate',
        element: <Unactivated />
    },
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
        element: <Register />
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
                element: <Home key={Date.now()} />
            },
            {
                path: 'community',
                element: <Communities key={Date.now()} />
            },
            {
                path: 'community/:community_id',
                element: <Community key={Date.now()} />
            },
            {
                path: 'community/:community_id/edit',
                element: <EditCommunity key={Date.now()} />
            },
            {
                path: 'create-community',
                element: <CreateCommunity key={Date.now()} />
            },
            {
                path: 'profile/:user_id',
                element: <UserProfilePage key={Date.now()} />
            },
            {
                path: 'create-post',
                element: <CreatePost key={Date.now()} />
            },
            {
                path: 'post/:post_id',
                element: <PostDetail key={Date.now()} />
            },
            {
                path: 'post/:post_id/edit',
                element: <EditPost key={Date.now()} />
            },
            {
                path: 'post/:post_id/:reply_id',
                element: <PostDetail key={Date.now()} />
            },
            {
                path: 'search',
                element: <Search key={Date.now()} />
            },
            {
                path: 'notification',
                element: <Notification key={Date.now()} />
            },
            {
                path: 'saved-post',
                element: <SavedPost key={Date.now()} />
            },
            {
                path: 'settings',
                element: <UserSettings key={Date.now()} />
            }
        ]
    }
])


const BrowserRouter = () => {
    return <RouterProvider router={routes} />
}

export default BrowserRouter