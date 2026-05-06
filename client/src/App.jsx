import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile"

// Step 1: Import your pages here
import Home from './pages/Home'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";

import Header from "./assets/Header.svg";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col h-screen overflow-hidden">
        <img src={Header} alt="" className="w-full z-50 block" />
        <div className="flex-1 min-h-0">  {/* fills remaining height exactly */}

        <Routes>
          {/* Step 2: Add more routes here */}
          
          {/* ── Routes WITH a Navbar ── */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={<Events />} />
          </Route>

          {/* ── Routes WITHOUT a Navbar ── */}
          {/* e.g. <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          
        </Routes>
        </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
