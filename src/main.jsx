import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './navbar.jsx'
import Index from './index.jsx'
import Error from './error.jsx'
import Log from './log.jsx'
import ServerMonitor from './monitor.jsx'

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
          <Route path="/log" element={<Log />} />
          <Route path="/monitor" element={<ServerMonitor />} />
          <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
