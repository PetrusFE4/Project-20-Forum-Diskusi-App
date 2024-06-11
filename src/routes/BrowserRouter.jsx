import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Login from '../pages/login/Login'
import Registrasi from '../pages/registrasi/Registrasi'
import Forgetpassword from '../pages/forgetpassword/ForgetPassword'
import MainLayout from '../layouts/MainLayout'
import DiscussionDetail from '../pages/discussion_detail/DiscussionDetail'
import About from '../routes/About'
import Contact from '../routes/Contact'
import Home from '../routes/home'

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
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
        element: <Registrasi />
    },
    {
        path: '/forgetpassword',
        element: <Forgetpassword />
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

<Navbar />
export default BrowserRouter