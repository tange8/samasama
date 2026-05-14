import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile"

// Step 1: Import your pages here
import Home from './pages/Home'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import MeetTeam from "./pages/MeetTeam"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Step 2: Add more routes here */}
          
          {/* ── Routes WITH a Navbar ── */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={<Events />} />
            <Route path="/meet-team" element={<MeetTeam />} /> 
          </Route>

          {/* ── Routes WITHOUT a Navbar ── */}
          {/* e.g. <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
