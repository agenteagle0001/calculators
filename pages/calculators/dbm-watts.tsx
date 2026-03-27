import { useState } from 'react'
import Layout from '../../components/Layout'

export default function DbmWatts() {
  const [dbm, setDbm] = useState('')

  const dbmToWatts = (d: number) => Math.pow(10, (d - 30) / 10)
  const wattsToDbm = (w: number) => 10 * Math.log10(w * 1000)

  const dbmVal = parseFloat(dbm) || 0
  const watts = dbmToWatts(dbmVal)

  const commonPowers = [0.001, 0.01, 0.1, 1, 5, 10, 20, 30, 40, 50, 100]

  return (
    <Layout
      title="dBm to Watts Calculator"
      description="Convert between dBm and Watts for RF engineering. Common in wireless, telecom, and audio."
    >
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">dBm</label>
          <input
            type="number"
            value={dbm}
            onChange={e => setDbm(e.target.value)}
            placeholder="Enter dBm (e.g., 30)"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white text-2xl focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="p-6 bg-gray-900 rounded-xl text-center">
          <div className="text-sm text-gray-400 mb-1">Watts</div>
          <div className="text-5xl font-bold text-blue-400">
            {dbm ? watts.toFixed(6) : '0.000000'}
          </div>
          <div className="text-sm text-gray-500 mt-1">W</div>
        </div>

        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Common Values</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {commonPowers.map(w => (
              <button
                key={w}
                onClick={() => setDbm(wattsToDbm(w).toFixed(2))}
                className="bg-gray-800 hover:bg-gray-700 rounded px-3 py-2 text-left transition"
              >
                <span className="text-gray-400">{w < 1 ? `${w * 1000} mW` : `${w} W`}</span>
                <span className="text-gray-600 ml-2">→</span>
                <span className="text-white ml-2">{wattsToDbm(w).toFixed(1)} dBm</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Formulas</h3>
          <div className="text-sm space-y-1">
            <p><span className="text-gray-500">dBm to W:</span> <span className="text-white">10^((dBm - 30) / 10)</span></p>
            <p><span className="text-gray-500">W to dBm:</span> <span className="text-white">10 × log₁₀(W × 1000)</span></p>
            <p><span className="text-gray-500">Reference:</span> <span className="text-white">0 dBm = 1 mW</span></p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
