import { BrowserRouter, Routes, Route } from "react-router-dom";

// Step 1: Import your pages here
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/" element={<Home />} />


        {/* Step 2: Add more routes here (e.g., /login, /profile) */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;