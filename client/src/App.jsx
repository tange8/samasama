import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/features/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile"

// Step 1: Import your pages here
import Home from './pages/Home'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import MeetTeam from "./pages/MeetTeam"

import Header from "./assets/Header.svg";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden">
          <img src={Header} alt="" className="w-full z-50 block flex-shrink-0" />

          <div className="flex-1 min-h-0 ">  
            <Routes>
              
              {/* ── PUBLIC ROUTES ── */}
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>

              {/* ── PRIVATE ROUTES ── */}
              <Route element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/events" element={<Events />} />
                <Route path="/meet-team" element={<MeetTeam />} /> 
              </Route>

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;