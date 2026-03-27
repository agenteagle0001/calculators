import { useState } from 'react'
import Layout from '../../components/Layout'

const BANDS = [
  { name: 'Black', color: '#1a1a1a', value: 0 },
  { name: 'Brown', color: '#8B4513', value: 1 },
  { name: 'Red', color: '#DC2626', value: 2 },
  { name: 'Orange', color: '#EA580C', value: 3 },
  { name: 'Yellow', color: '#CA8A04', value: 4 },
  { name: 'Green', color: '#16A34A', value: 5 },
  { name: 'Blue', color: '#2563EB', value: 6 },
  { name: 'Violet', color: '#7C3AED', value: 7 },
  { name: 'Gray', color: '#6B7280', value: 8 },
  { name: 'White', color: '#F3F4F6', value: 9 },
]

const MULTIPLIERS = [
  { name: 'Black', color: '#1a1a1a', mult: 1 },
  { name: 'Brown', color: '#8B4513', mult: 10 },
  { name: 'Red', color: '#DC2626', mult: 100 },
  { name: 'Orange', color: '#EA580C', mult: 1000 },
  { name: 'Yellow', color: '#CA8A04', mult: 10000 },
  { name: 'Green', color: '#16A34A', mult: 100000 },
  { name: 'Blue', color: '#2563EB', mult: 1000000 },
  { name: 'Gold', color: '#D97706', mult: 0.1 },
  { name: 'Silver', color: '#9CA3AF', mult: 0.01 },
]

const TOLERANCES = [
  { name: 'Brown', color: '#8B4513', tol: 1 },
  { name: 'Red', color: '#DC2626', tol: 2 },
  { name: 'Green', color: '#16A34A', tol: 0.5 },
  { name: 'Blue', color: '#2563EB', tol: 0.25 },
  { name: 'Violet', color: '#7C3AED', tol: 0.1 },
  { name: 'Gold', color: '#D97706', tol: 5 },
  { name: 'Silver', color: '#9CA3AF', tol: 10 },
]

function BandPicker({ label, bands, selected, onChange }: { label: string, bands: any[], selected: number, onChange: (i: number) => void }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <div className="flex gap-2 flex-wrap">
        {bands.map((b, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`w-10 h-10 rounded-lg border-2 transition ${
              selected === i ? 'border-white scale-110' : 'border-transparent hover:border-gray-500'
            }`}
            style={{ backgroundColor: b.color }}
            title={b.name}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-1">{bands[selected]?.name}</p>
    </div>
  )
}

export default function ResistorColor() {
  const [band1, setBand1] = useState(0)
  const [band2, setBand2] = useState(0)
  const [multiplier, setMultiplier] = useState(2) // Red = 100
  const [tolerance, setTolerance] = useState(5) // Gold = 5%

  const value1 = BANDS[band1].value
  const value2 = BANDS[band2].value
  const mult = MULTIPLIERS[multiplier].mult
  const tol = TOLERANCES[tolerance].tol

  const resistance = (value1 * 10 + value2) * mult
  const min = resistance * (1 - tol / 100)
  const max = resistance * (1 + tol / 100)

  const format = (v: number) => {
    if (v >= 1000000) return `${(v / 1000000).toFixed(2)} MΩ`
    if (v >= 1000) return `${(v / 1000).toFixed(2)} kΩ`
    return `${v.toFixed(2)} Ω`
  }

  return (
    <Layout
      title="Resistor Color Code Calculator"
      description="Decode resistor color bands to find resistance value and tolerance. Free online EE tool."
    >
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <BandPicker label="Band 1 (1st digit)" bands={BANDS} selected={band1} onChange={setBand1} />
          <BandPicker label="Band 2 (2nd digit)" bands={BANDS} selected={band2} onChange={setBand2} />
          <BandPicker label="Multiplier" bands={MULTIPLIERS} selected={multiplier} onChange={setMultiplier} />
        </div>

        <BandPicker label="Tolerance" bands={TOLERANCES} selected={tolerance} onChange={setTolerance} />

        <div className="mt-8 p-6 bg-gray-900 rounded-xl text-center">
          <div className="text-4xl font-bold text-white mb-2">
            {format(resistance)}
          </div>
          <div className="text-gray-400">
            ±{tol}% &nbsp;|&nbsp; Range: {format(min)} — {format(max)}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Formula</h3>
          <p className="text-white font-mono">
            ({value1}{value2}) × {mult} = {resistance.toFixed(2)} Ω
          </p>
        </div>
      </div>
    </Layout>
  )
}
