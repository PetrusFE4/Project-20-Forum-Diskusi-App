// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './routes/home'
import Dashboard from './pages/dashboard/Dashboard'
import Communities from "./pages/Communities";
import Register from "./pages/registrasi/Registrasi";
import Account from "./pages/Account";
import Post from "./pages/Post";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/post" element={<Post />} />
                <Route path="/register" element={<Register />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
