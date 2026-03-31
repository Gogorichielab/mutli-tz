import { useState, useEffect, useCallback } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'

// Natural Earth topojson from the react-simple-maps CDN / unpkg
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const CITIES = [
  {
    id: 'india',
    city: 'Mumbai',
    country: 'India',
    flag: '🇮🇳',
    tz: 'Asia/Kolkata',
    coords: [72.88, 19.08],
    offset: '+5:30',
  },
  {
    id: 'chicago',
    city: 'Chicago',
    country: 'United States',
    flag: '🇺🇸',
    tz: 'America/Chicago',
    coords: [-87.63, 41.88],
    offset: 'CT',
  },
  {
    id: 'scotland',
    city: 'Edinburgh',
    country: 'Scotland',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    tz: 'Europe/London',
    coords: [-3.19, 55.95],
    offset: 'GMT',
  },
  {
    id: 'portugal',
    city: 'Lisbon',
    country: 'Portugal',
    flag: '🇵🇹',
    tz: 'Europe/Lisbon',
    coords: [-9.14, 38.72],
    offset: 'WET',
  },
  {
    id: 'manila',
    city: 'Manila',
    country: 'Philippines',
    flag: '🇵🇭',
    tz: 'Asia/Manila',
    coords: [120.98, 14.60],
    offset: '+8',
  },
  {
    id: 'boston',
    city: 'Boston',
    country: 'United States',
    flag: '🇺🇸',
    tz: 'America/New_York',
    coords: [-71.06, 42.36],
    offset: 'ET',
  },
]

function getTime(tz) {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: tz,
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function getDate(tz) {
  return new Date().toLocaleDateString('en-US', {
    timeZone: tz,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function getHMS(tz) {
  const s = new Date().toLocaleTimeString('en-US', {
    timeZone: tz,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  return s.split(':').map(Number)
}

function AnalogClock({ tz }) {
  const [hms, setHms] = useState(getHMS(tz))
  useEffect(() => {
    const id = setInterval(() => setHms(getHMS(tz)), 1000)
    return () => clearInterval(id)
  }, [tz])

  const [h, m, s] = hms
  const hAngle = (h % 12) * 30 + m * 0.5
  const mAngle = m * 6
  const sAngle = s * 6
  const cx = 18, cy = 18
  const toXY = (angle, len) => [
    cx + len * Math.sin((angle * Math.PI) / 180),
    cy - len * Math.cos((angle * Math.PI) / 180),
  ]
  const [hx, hy] = toXY(hAngle, 8)
  const [mx, my] = toXY(mAngle, 12)
  const [sx, sy] = toXY(sAngle, 12)

  return (
    <svg viewBox="0 0 36 36" width="36" height="36">
      <circle cx={cx} cy={cy} r={16} stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
      <circle cx={cx} cy={cy} r={13} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" fill="none" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => {
        const [x1,y1] = toXY(a, 13.5)
        const [x2,y2] = toXY(a, a%90===0 ? 11 : 12.2)
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.15)" strokeWidth={a%90===0?1:0.5}/>
      })}
      <line x1={cx} y1={cy} x2={hx} y2={hy} stroke="rgba(232,228,216,0.85)" strokeWidth="2.2" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={mx} y2={my} stroke="rgba(232,228,216,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={sx} y2={sy} stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="1.8" fill="#c9a84c" />
      <circle cx={cx} cy={cy} r="0.7" fill="#0d1a2b" />
    </svg>
  )
}

function ClockCard({ city, delay }) {
  const [time, setTime] = useState(getTime(city.tz))
  const [date, setDate] = useState(getDate(city.tz))

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTime(city.tz))
      setDate(getDate(city.tz))
    }, 1000)
    return () => clearInterval(id)
  }, [city.tz])

  return (
    <div style={{
      background: 'var(--surface)',
      padding: '1.6rem 1.4rem',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'default',
      transition: 'background 0.25s',
      animation: `fadeUp 0.7s ${delay}s ease both`,
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
    onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
    >
      {/* Top accent line on hover via pseudo isn't easy in inline — use a box */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
        opacity: 0, transition: 'opacity 0.25s',
      }} className="card-accent-line" />

      <div style={{ position: 'absolute', top: '1rem', right: '1.2rem' }}>
        <AnalogClock tz={city.tz} />
      </div>

      <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{city.flag}</span>
      <span style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: '1.1rem',
        display: 'block',
        marginBottom: '0.1rem',
        color: 'var(--text)',
      }}>{city.city}</span>
      <span style={{
        fontSize: '0.58rem',
        letterSpacing: '0.18em',
        color: 'var(--muted)',
        textTransform: 'uppercase',
        display: 'block',
        marginBottom: '0.9rem',
      }}>{city.country}</span>
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '1.55rem',
        fontWeight: 500,
        color: 'var(--accent)',
        letterSpacing: '-0.02em',
        display: 'block',
        lineHeight: 1,
      }}>{time}</span>
      <span style={{
        fontSize: '0.6rem',
        color: 'var(--muted)',
        letterSpacing: '0.1em',
        marginTop: '0.4rem',
        display: 'block',
      }}>{date}</span>
      <span style={{
        position: 'absolute',
        bottom: '0.9rem',
        right: '1.1rem',
        fontSize: '0.52rem',
        letterSpacing: '0.15em',
        color: 'rgba(100,160,220,0.2)',
        textTransform: 'uppercase',
      }}>{city.tz.split('/')[1]?.replace('_', ' ')}</span>
    </div>
  )
}

function WorldMap({ times }) {
  const [tooltip, setTooltip] = useState(null)
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 })

  return (
    <div style={{ position: 'relative', background: '#071524', borderRadius: '0 0 14px 14px' }}>
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 185, center: [10, 10] }}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={setPosition}
          minZoom={0.8}
          maxZoom={6}
        >
          {/* Ocean background */}
          <rect x="-5000" y="-5000" width="10000" height="10000" fill="#071a2e" />

          {/* Lat/lon graticule lines */}
          {[-60,-30,0,30,60].map(lat => (
            <line key={`lat${lat}`}
              x1="-10000" y1={lat === 0 ? 0 : undefined} x2="10000"
              stroke={lat === 0 ? 'rgba(76,168,201,0.18)' : 'rgba(76,168,201,0.07)'}
              strokeWidth={lat === 0 ? 0.4 : 0.25}
            />
          ))}

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1a3828"
                  stroke="#2a5040"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover:   { fill: '#22483a', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* City markers */}
          {CITIES.map(city => (
            <Marker
              key={city.id}
              coordinates={city.coords}
              onMouseEnter={() => setTooltip(city.id)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Ripple ring */}
              <circle r={8} fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.3)" strokeWidth={0.8}>
                <animate attributeName="r" values="5;11;5" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite" />
              </circle>
              {/* Dot */}
              <circle
                r={3.5}
                fill="#c9a84c"
                stroke="#08111e"
                strokeWidth={1.2}
                style={{ cursor: 'pointer' }}
              />

              {/* Tooltip on hover */}
              {tooltip === city.id && (
                <g transform="translate(0, -18)">
                  <rect
                    x={-42} y={-26}
                    width={84} height={30}
                    rx={4}
                    fill="rgba(8,17,30,0.95)"
                    stroke="rgba(100,160,220,0.2)"
                    strokeWidth={0.6}
                  />
                  <text
                    textAnchor="middle"
                    y={-13}
                    style={{ fontFamily: "'DM Serif Display', serif", fontSize: '7px', fill: '#c9a84c' }}
                  >
                    {city.city}
                  </text>
                  <text
                    textAnchor="middle"
                    y={-3}
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: '6px', fill: '#e8e4d8' }}
                  >
                    {times[city.id]}
                  </text>
                </g>
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Zoom hint */}
      <div style={{
        position: 'absolute',
        bottom: '0.8rem',
        right: '1rem',
        fontSize: '0.52rem',
        color: 'rgba(100,160,220,0.3)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        pointerEvents: 'none',
      }}>
        Scroll to zoom · Drag to pan
      </div>
    </div>
  )
}

export default function App() {
  const [utc, setUtc] = useState('')
  const [times, setTimes] = useState(() =>
    Object.fromEntries(CITIES.map(c => [c.id, getTime(c.tz)]))
  )

  useEffect(() => {
    const id = setInterval(() => {
      setUtc(new Date().toUTCString().slice(17, 25) + ' UTC')
      setTimes(Object.fromEntries(CITIES.map(c => [c.id, getTime(c.tz)])))
    }, 1000)
    setUtc(new Date().toUTCString().slice(17, 25) + ' UTC')
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'grid',
      gridTemplateRows: 'auto minmax(0, 1fr) auto',
      position: 'relative',
      zIndex: 1,
      maxWidth: '1120px',
      margin: '0 auto',
      padding: 'clamp(1rem, 2.5vh, 2.2rem) 1.5rem clamp(1rem, 2.5vh, 2.4rem)',
      overflow: 'hidden',
    }}>

      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: 'clamp(0.65rem, 1.8vh, 1.4rem)',
        animation: 'fadeDown 0.8s ease both',
      }}>
        <p style={{ fontSize: '0.62rem', letterSpacing: '0.38em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.7rem' }}>
          Global Time Dashboard
        </p>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color: 'var(--text)',
        }}>
          The <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>World</em> Clock
        </h1>
        <p style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.12em' }}>
          Six cities &nbsp;·&nbsp; One view &nbsp;·&nbsp; Always live
        </p>
      </header>

      {/* UTC Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '0.5rem', marginBottom: 'clamp(0.75rem, 1.7vh, 1.4rem)',
        fontSize: '0.63rem', color: 'var(--muted)',
        animation: 'fadeDown 1s 0.1s ease both',
      }}>
        <span>UTC</span>
        <span style={{ opacity: 0.3 }}>·</span>
        <span style={{ color: 'var(--accent2)', fontWeight: 500 }}>{utc}</span>
      </div>

      <main className="app-content-grid" style={{
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: 'minmax(0, 1fr) auto',
        gap: 'clamp(0.75rem, 1.8vh, 1.2rem)',
      }}>
        {/* Map Card */}
        <div style={{
          border: '1px solid var(--border)',
          borderRadius: '16px',
          overflow: 'hidden',
          animation: 'fadeUp 0.9s 0.2s ease both',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          minHeight: 0,
        }}>
          {/* Map header bar */}
          <div style={{
            padding: '0.7rem 1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.28em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              World Map
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '0.55rem', color: 'rgba(201,168,76,0.5)', letterSpacing: '0.15em' }}>
              NATURAL EARTH PROJECTION
            </span>
          </div>

          <WorldMap times={times} />
        </div>

        {/* Clock Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
        }}>
          {CITIES.map((city, i) => (
            <ClockCard key={city.id} city={city} delay={0.1 + i * 0.08} />
          ))}
        </div>
      </main>

      <footer style={{
        textAlign: 'center',
        marginTop: 'clamp(0.7rem, 2vh, 1.4rem)',
        fontSize: '0.55rem',
        color: 'rgba(232,228,216,0.18)',
        letterSpacing: '0.18em',
        animation: 'fadeUp 1s 0.7s ease both',
        paddingTop: 'clamp(0.25rem, 1vh, 0.65rem)',
      }}>
        LIVE · UPDATING EVERY SECOND · ALL TIMES LOCAL
      </footer>

    </div>
  )
}
