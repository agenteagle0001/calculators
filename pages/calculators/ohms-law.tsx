import { useState } from 'react'
import Layout from '../../components/Layout'

export default function OhmsLaw() {
  const [voltage, setVoltage] = useState('')
  const [current, setCurrent] = useState('')
  const [resistance, setResistance] = useState('')
  const [power, setPower] = useState('')

  const calc = () => {
    let V = parseFloat(voltage) || 0
    let I = parseFloat(current) || 0
    let R = parseFloat(resistance) || 0

    if (V && I) {
      R = V / I
      setResistance(R.toFixed(4))
    } else if (V && R) {
      I = V / R
      setCurrent(I.toFixed(6))
    } else if (I && R) {
      V = I * R
      setVoltage(V.toFixed(4))
    }

    if (V && I) {
      setPower((V * I).toFixed(4))
    } else if (V && R) {
      setPower(((V * V) / R).toFixed(4))
    } else if (I && R) {
      setPower((I * I * R).toFixed(4))
    }
  }

  return (
    <Layout
      title="Ohm's Law & Power Calculator"
      description="Calculate voltage, current, resistance, and power using Ohm's Law. Free online EE tool."
    >
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Voltage (V)</label>
            <input
              type="number"
              value={voltage}
              onChange={e => setVoltage(e.target.value)}
              onInput={calc}
              placeholder="0"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Current (A)</label>
            <input
              type="number"
              value={current}
              onChange={e => setCurrent(e.target.value)}
              onInput={calc}
              placeholder="0"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Resistance (Ω)</label>
            <input
              type="number"
              value={resistance}
              onChange={e => setResistance(e.target.value)}
              onInput={calc}
              placeholder="0"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Power (W)</label>
            <input
              type="number"
              value={power}
              readOnly
              placeholder="Calculated"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-blue-400"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Formulas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><span className="text-gray-500">V =</span> <span className="text-white">I × R</span></div>
            <div><span className="text-gray-500">I =</span> <span className="text-white">V / R</span></div>
            <div><span className="text-gray-500">R =</span> <span className="text-white">V / I</span></div>
            <div><span className="text-gray-500">P =</span> <span className="text-white">V × I</span></div>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Enter any two values to calculate the rest. Power is calculated automatically.
        </p>
      </div>
    </Layout>
  )
}
