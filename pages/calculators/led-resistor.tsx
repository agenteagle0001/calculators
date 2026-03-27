import { useState } from 'react'
import Layout from '../../components/Layout'

export default function LedResistor() {
  const [voltage, setVoltage] = useState('12')
  const [ledVoltage, setLedVoltage] = useState('2.0')
  const [ledCurrent, setLedCurrent] = useState('0.020')

  const V = parseFloat(voltage) || 0
  const Vf = parseFloat(ledVoltage) || 0
  const If = parseFloat(ledCurrent) || 0

  const resistor = (V - Vf) / If
  const power = If * If * resistor
  const ledPower = If * Vf

  const format = (v: number) => {
    if (resistor >= 1000000) return `${(resistor / 1000000).toFixed(2)} MΩ`
    if (resistor >= 1000) return `${(resistor / 1000).toFixed(2)} kΩ`
    return `${resistor.toFixed(2)} Ω`
  }

  const presets = [
    { name: 'Red LED',Vf: 2.0 },
    { name: 'Green LED',Vf: 2.2 },
    { name: 'Blue LED',Vf: 3.2 },
    { name: 'White LED',Vf: 3.4 },
    { name: 'IR LED',Vf: 1.5 },
  ]

  return (
    <Layout
      title="LED Current Limiter Calculator"
      description="Calculate the series resistor needed to limit current for an LED. Free online EE tool."
    >
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Supply Voltage (V)</label>
            <input
              type="number"
              value={voltage}
              onChange={e => setVoltage(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">LED Forward Voltage (Vf)</label>
            <input
              type="number"
              value={ledVoltage}
              onChange={e => setLedVoltage(e.target.value)}
              step="0.1"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Desired LED Current (I)</label>
            <input
              type="number"
              value={ledCurrent}
              onChange={e => setLedCurrent(e.target.value)}
              step="0.001"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-900 rounded-lg text-center">
            <div className="text-sm text-gray-400 mb-1">Resistor Needed</div>
            <div className="text-3xl font-bold text-blue-400">{isFinite(resistor) && resistor > 0 ? format(resistor) : 'N/A'}</div>
            <div className="text-xs text-gray-500 mt-1">Power: {isFinite(power) && power > 0 ? `${(power).toFixed(2)} W` : 'N/A'}</div>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg text-center">
            <div className="text-sm text-gray-400 mb-1">Resistor Power Dissipation</div>
            <div className="text-3xl font-bold text-orange-400">{isFinite(power) && power > 0 ? `${(power).toFixed(3)} W` : 'N/A'}</div>
            <div className="text-xs text-gray-500 mt-1">Use {(power * 2).toFixed(2)} W rated resistor minimum</div>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg text-center">
            <div className="text-sm text-gray-400 mb-1">LED Power</div>
            <div className="text-3xl font-bold text-green-400">{isFinite(ledPower) && ledPower > 0 ? `${(ledPower).toFixed(3)} W` : 'N/A'}</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-sm font-medium text-gray-400 mb-2">LED Presets</h3>
          <div className="flex gap-2 flex-wrap">
            {presets.map(p => (
              <button
                key={p.name}
                onClick={() => setLedVoltage(p.Vf.toString())}
                className="bg-gray-800 hover:bg-gray-700 rounded px-3 py-1 text-sm transition"
              >
                {p.name} ({p.Vf}V)
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Formula</h3>
          <p className="text-white font-mono">R = (V_supply - V_LED) / I_LED = ({V.toFixed(1)} - {Vf.toFixed(1)}) / {If.toFixed(3)} = {isFinite(resistor) && resistor > 0 ? `${resistor.toFixed(2)} Ω` : 'N/A'}</p>
        </div>
      </div>
    </Layout>
  )
}
