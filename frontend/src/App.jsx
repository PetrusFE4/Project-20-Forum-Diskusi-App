// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin";
import UserData from "./pages/DashboardAdmin/UserData";
import Communities from "./pages/Communities";
import Login from "./pages/login/Login";
import Register from "./pages/registrasi/Registrasi";
import Account from "./pages/Account";
import Post from "./pages/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserData />} />
        {/* <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<Account />} /> 
                <Route path="/dashboard" element={<Dashboard />}/>
                 <Route path="/communities" element={<Communities />}/>
                <Route path="/post" element={<Post />}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
