import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './index.jsx'
import Error from './error.jsx'
import LiveOsu from './live-osu.jsx'

// Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// CSS + SCSS
import './scss/theme.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat/osu" element={<LiveOsu />} />
          <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
