import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './navbar.jsx'
import Index from './index.jsx'
import Error from './error.jsx'
import LiveOsu from './live-osu.jsx'
import LogOsu from './log/osu.jsx'
import Log from './log.jsx'

// Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// CSS + SCSS
import './scss/theme.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat/osu" element={<LiveOsu />} />
          <Route path="/log/osu" element={<LogOsu />} />
          <Route path="/log" element={<Log />} />
          <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
