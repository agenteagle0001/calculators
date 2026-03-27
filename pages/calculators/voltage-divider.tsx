import { useState } from 'react'
import Layout from '../../components/Layout'

export default function VoltageDivider() {
  const [vin, setVin] = useState('12')
  const [r1, setR1] = useState('1000')
  const [r2, setR2] = useState('1000')

  const Vin = parseFloat(vin) || 0
  const R1 = parseFloat(r1) || 0
  const R2 = parseFloat(r2) || 0

  const vout = Vin * (R2 / (R1 + R2))
  const i = Vin / (R1 + R2)
  const powerR1 = i * i * R1
  const powerR2 = i * i * R2

  const commonR1 = [470, 1000, 2200, 4700, 10000]
  const commonR2 = [470, 1000, 2200, 4700, 10000]

  const format = (v: number) => {
    if (v >= 1000000) return `${(v / 1000000).toFixed(2)} MΩ`
    if (v >= 1000) return `${(v / 1000).toFixed(2)} kΩ`
    return `${v.toFixed(2)} Ω`
  }

  return (
    <Layout
      title="Voltage Divider Calculator"
      description="Calculate output voltage, resistor values, and power dissipation in a voltage divider circuit."
    >
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Input Voltage (Vin)</label>
            <input
              type="number"
              value={vin}
              onChange={e => setVin(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">R1 (Ω)</label>
            <input
              type="number"
              value={r1}
              onChange={e => setR1(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">R2 (Ω)</label>
            <input
              type="number"
              value={r2}
              onChange={e => setR2(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="p-6 bg-gray-900 rounded-xl text-center mb-6">
          <div className="text-sm text-gray-400 mb-1">Output Voltage (Vout)</div>
          <div className="text-5xl font-bold text-green-400">{vout.toFixed(3)} V</div>
          <div className="text-sm text-gray-500 mt-1">
            {Vin > 0 ? ((vout / Vin) * 100).toFixed(1) : 0}% of input
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="p-3 bg-gray-900 rounded-lg text-center">
            <div className="text-gray-400">Current</div>
            <div className="text-white font-medium">{(i * 1000).toFixed(3)} mA</div>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg text-center">
            <div className="text-gray-400">Power R1</div>
            <div className="text-orange-400 font-medium">{(powerR1 * 1000).toFixed(3)} mW</div>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg text-center">
            <div className="text-gray-400">Power R2</div>
            <div className="text-orange-400 font-medium">{(powerR2 * 1000).toFixed(3)} mW</div>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg text-center">
            <div className="text-gray-400">Total Power</div>
            <div className="text-red-400 font-medium">{((powerR1 + powerR2) * 1000).toFixed(3)} mW</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Formulas</h3>
          <div className="text-sm space-y-1">
            <p><span className="text-gray-500">Vout =</span> <span className="text-white">Vin × (R2 / (R1 + R2))</span></p>
            <p><span className="text-gray-500">I =</span> <span className="text-white">Vin / (R1 + R2)</span></p>
            <p><span className="text-gray-500">Circuit:</span></p>
            <pre className="text-gray-300 bg-gray-800 p-2 rounded mt-1 text-xs">
  Vin ──┤├─── R1 ──┬──┬── Vout
              └───┘  └───┘
                   R2</pre>
          </div>
        </div>
      </div>
    </Layout>
  )
}
