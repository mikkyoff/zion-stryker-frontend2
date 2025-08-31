import React, { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'

export default function App(){
  const [theme, setTheme] = useState('dark')
  useEffect(()=> document.body.classList.toggle('light', theme==='light'), [theme])
  return (
    <div className="container">
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1>Zion Stryker</h1>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <Settings />
          <button onClick={()=>setTheme(t=> t==='dark'?'light':'dark')}>{theme==='dark'?'Light':'Dark'}</button>
        </div>
      </header>
      <main><Dashboard /></main>
    </div>
  )
}
