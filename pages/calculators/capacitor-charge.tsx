import { useState } from 'react'
import Layout from '../../components/Layout'

export default function CapacitorCharge() {
  const [voltage, setVoltage] = useState('12')
  const [resistance, setResistance] = useState('1000')
  const [capacitance, setCapacitance] = useState('0.000001')

  const V = parseFloat(voltage) || 0
  const R = parseFloat(resistance) || 0
  const C = parseFloat(capacitance) || 0

  const tau = R * C
  const charge63 = tau
  const charge95 = tau * 3
  const charge99 = tau * 5

  const formatTime = (t: number) => {
    if (t < 0.001) return `${(t * 1000000).toFixed(2)} µs`
    if (t < 1) return `${(t * 1000).toFixed(2)} ms`
    if (t < 60) return `${t.toFixed(2)} s`
    return `${(t / 60).toFixed(2)} min`
  }

  const formatR = (r: number) => {
    if (r >= 1000000) return `${(r / 1000000).toFixed(2)} MΩ`
    if (r >= 1000) return `${(r / 1000).toFixed(2)} kΩ`
    return `${r.toFixed(2)} Ω`
  }

  const formatC = (c: number) => {
    if (c < 0.000000001) return `${(c * 1000000000).toFixed(2)} nF`
    if (c < 0.000001) return `${(c * 1000000).toFixed(2)} µF`
    if (c < 0.001) return `${(c * 1000).toFixed(2)} mF`
    return `${c.toFixed(2)} F`
  }

  const percentCharged = (t: number) => (1 - Math.exp(-t / tau)) * 100

  return (
    <Layout
      title="Capacitor Charge Time Calculator"
      description="Calculate RC time constant and charge/discharge times for capacitor circuits."
    >
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Source Voltage (V)</label>
            <input
              type="number"
              value={voltage}
              onChange={e => setVoltage(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Resistance (Ω)</label>
            <input
              type="number"
              value={resistance}
              onChange={e => setResistance(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Capacitance (F)</label>
            <input
              type="number"
              value={capacitance}
              onChange={e => setCapacitance(e.target.value)}
              step="0.000001"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="p-6 bg-gray-900 rounded-xl text-center mb-6">
          <div className="text-sm text-gray-400 mb-1">Time Constant (τ = R × C)</div>
          <div className="text-4xl font-bold text-blue-400">{formatTime(tau)}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-900 rounded-lg text-center">
            <div className="text-sm text-gray-400 mb-1">63% charged</div>
            <div className="text-2xl font-bold text-green-400">{formatTime(charge63)}</div>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg text-center">
            <div className="text-sm text-gray-400 mb-1">95% charged</div>
            <div className="text-2xl font-bold text-yellow-400">{formatTime(charge95)}</div>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg text-center">
            <div className="text-sm text-gray-400 mb-1">99% charged</div>
            <div className="text-2xl font-bold text-orange-400">{formatTime(charge99)}</div>
          </div>
        </div>

        <div className="p-4 bg-gray-900 rounded-lg">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Quick Reference</h3>
          <div className="text-sm space-y-1">
            <p className="text-gray-500">R = {formatR(R)} × C = {formatC(C)} = τ = {formatTime(tau)}</p>
            <p className="text-white">V(t) = V₀ × (1 - e^(-t/τ))</p>
            <p className="text-gray-500">τ = R × C</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Common Capacitor Values</h3>
          <div className="flex gap-2 flex-wrap">
            {[0.1, 1, 10, 100].map(uf => (
              <button
                key={uf}
                onClick={() => setCapacitance((uf * 0.000001).toString())}
                className="bg-gray-800 hover:bg-gray-700 rounded px-3 py-1 text-sm transition"
              >
                {uf} µF
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
