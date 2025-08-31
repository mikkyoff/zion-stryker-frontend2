import React from 'react'

export default function Settings(){
  return (
    <div style={{display:'flex',gap:8,alignItems:'center'}}>
      <a href="#" onClick={(e)=>{e.preventDefault(); alert('Settings panel not implemented yet')}} style={{textDecoration:'none',color:'inherit'}}>Settings</a>
    </div>
  )
}
