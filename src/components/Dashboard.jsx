import React, { useEffect, useRef, useState } from 'react'
import { fetchSignals, toggleScanner, getStatus } from '../services/api'

const TIMEFRAMES = ['30s','1m','2m','3m','5m','10m','15m']
const MODES = ['Flash','Super']

function ConfidenceBar({ value }) {
  const pct = Math.max(0, Math.min(100, value || 0))
  return <div style={{height:8,background:'#1f2937',borderRadius:6,overflow:'hidden'}}><div style={{width: pct+'%',height:'100%',background:'#10b981'}}/></div>
}

export default function Dashboard(){
  const [timeframe, setTimeframe] = useState('1m')
  const [mode, setMode] = useState('Flash')
  const [signals, setSignals] = useState([])
  const [history, setHistory] = useState([])
  const [auto, setAuto] = useState(false)
  const [intervalSec, setIntervalSec] = useState(10)
  const [scannerOn, setScannerOn] = useState(false)
  const timerRef = useRef(null)

  useEffect(()=> {
    let mounted = true
    getStatus().then(s => { if(mounted) setScannerOn(!!s.scanner_running) }).catch(()=>{})
    return ()=> mounted=false
  },[])

  useEffect(()=> {
    async function load(){
      try{
        const data = await fetchSignals({ timeframe, mode, asset: 'ALL' })
        const enriched = (data || []).map((s, idx) => ({ ...s, _id: `${s.asset}-${s.timeframe}-${s.direction}-${idx}-${Date.now()}`, _ts: Date.now(), reasons: s.reasons || s.reason ? (s.reasons || [s.reason]) : [] }))
        setSignals(enriched)
        setHistory(prev => {
          const combined = [...enriched, ...prev]
          const dedup = []
          const seen = new Set()
          for (const it of combined) {
            const key = `${it.asset}-${it.timeframe}-${it.direction}-${it._ts}`
            if (!seen.has(key)) { seen.add(key); dedup.push(it) }
            if (dedup.length >= 50) break
          }
          return dedup
        })
      }catch(err){ console.error(err) }
    }

    load()
    if (auto && scannerOn) {
      timerRef.current = setInterval(load, Math.max(3, intervalSec) * 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return ()=> clearInterval(timerRef.current)
  }, [timeframe, mode, auto, intervalSec, scannerOn])

  async function handleToggleScanner(){
    try{
      const newState = !scannerOn
      await toggleScanner(newState)
      setScannerOn(newState)
    }catch(err){
      alert('Failed to toggle scanner: '+err.message)
    }
  }

  function openBrokerChart(asset){
    const encoded = encodeURIComponent(asset)
    window.open(`https://pocketoption.com/en/cabinet/assets?search=${encoded}`, '_blank')
  }

  return (
    <div style={{marginTop:16}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <label>Timeframe</label>
          <select value={timeframe} onChange={e=>setTimeframe(e.target.value)}>
            {TIMEFRAMES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <label>Mode</label>
          <select value={mode} onChange={e=>setMode(e.target.value)}>
            {MODES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <label>Auto-refresh</label>
          <input type="checkbox" checked={auto} onChange={e=>setAuto(e.target.checked)} />
          <input type="number" min={3} max={120} value={intervalSec} onChange={e=>setIntervalSec(Number(e.target.value)||10)} style={{width:90}} />
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button onClick={handleToggleScanner} style={{padding:'8px 12px',borderRadius:8,background: scannerOn ? '#ef4444' : '#10b981', color:'#fff', border:'none'}}>
            {scannerOn ? 'Turn Scanner OFF' : 'Turn Scanner ON'}
          </button>
        </div>
      </div>

      <section style={{marginTop:12}}>
        <h3>Live Signals</h3>
        {signals.length === 0 && <p className="muted">No signals</p>}
        {signals.map(s => (
          <div key={s._id} style={{border:'1px solid rgba(255,255,255,0.06)',padding:10,borderRadius:8,marginBottom:8,background:'rgba(255,255,255,0.02)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <strong>{s.asset}</strong> <span style={{marginLeft:8,padding:'2px 8px',borderRadius:9999,background: s.direction && s.direction.toLowerCase()==='buy' ? '#064e3b' : '#7f1d1d'}}>{s.direction}</span>
                <span style={{marginLeft:8, padding:'2px 8px', borderRadius:9999, background:'#075985'}}>{s.timeframe}</span>
                <span style={{marginLeft:8, padding:'2px 8px', borderRadius:9999, background: (s.urgency||'').toLowerCase()==='hot' ? '#b91c1c' : '#b45309'}}>{s.urgency || 'normal'}</span>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button onClick={()=>openBrokerChart(s.asset)} style={{padding:'6px 10px', borderRadius:8}}>Open Chart</button>
              </div>
            </div>
            <div style={{marginTop:8}}><ConfidenceBar value={s.confidence}/></div>
            <div style={{marginTop:8}}>
              {(s.reasons||[]).map((r,i)=> <span key={i} style={{display:'inline-block',marginRight:6,padding:'3px 8px',borderRadius:9999,background:'#f59e0b',color:'#111'}}>{r}</span>)}
            </div>
            {s.expiry && <div style={{marginTop:8,color:'#94a3b8'}}>Expiry: {s.expiry}s</div>}
          </div>
        ))}
      </section>

      <section style={{marginTop:18}}>
        <h3>Signal History (newest first)</h3>
        {history.length === 0 && <p className="muted">No history</p>}
        <ul>
          {history.map(h => <li key={h._id}>{h.asset} — {h.direction} — {h.timeframe} — {new Date(h._ts).toLocaleString()}</li>)}
        </ul>
      </section>
    </div>
  )
}
