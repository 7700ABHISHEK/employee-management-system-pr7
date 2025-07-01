import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import About from "./pages/About"
import Service from "./pages/Service"
import Contact from "./pages/Contact"
import Employees from "./pages/Employees"
import { useEffect, useState } from "react"
import ProtectedRoute from "./components/ProtectedRoute"
import AddEmployee from "./pages/AddEmployee"
import { ToastContainer } from "react-toastify"
import EditEmployees from "./pages/EditEmployees"
import 'remixicon/fonts/remixicon.css'
const App = () => {

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const isLoggedIn = JSON.parse(localStorage.getItem("isLogin")) || false;
        setIsLogin(isLoggedIn);
    }, [])

    return (
        <BrowserRouter>
            <ToastContainer />
            <Header setIsLogin={setIsLogin} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/service" element={<Service />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/employees" element={<ProtectedRoute Component={Employees} />} />
                <Route path="/add-employees" element={<ProtectedRoute Component={AddEmployee} />} />
                <Route path="/edit-employee/:id" element={<ProtectedRoute Component={EditEmployees} />} />
                <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App