import { useState } from 'react'
import './App.css'
import React from 'react'
import Router from './assets/routes/AppRoutes'
import { ThemeProvider } from './utils/ThemeContext'

function App() {

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  )
}

export default App
