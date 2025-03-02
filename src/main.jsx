import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './index.jsx'
import Error from './error.jsx'

// Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// CSS + SCSS
import './scss/styles.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
