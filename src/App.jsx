// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from './pages/dashboard/Dashboard'
import Communities from "./pages/Communities";
import Account from "./pages/Account";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Post from "./pages/Post";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/account" element={<Account />} />
                 <Route path="/communities" element={<Communities />} />
                 <Route path="/post" element={<Post />} />
                {/* <Route path="/register" element={<Register />} />
                <Route path="*" element={<NoPage />} />   */}
            </Routes>
        </BrowserRouter>
    )
}

export default App
