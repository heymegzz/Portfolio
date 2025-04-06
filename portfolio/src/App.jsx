import { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'
import './App.css'

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <HomePage />
        <AboutPage />
        <ProjectsPage />
        <ContactPage />
      </main>
    </div>
  )
}

export default App
