import Link from 'next/link'

const calculators = [
  {
    href: '/calculators/ohms-law',
    name: "Ohm's Law",
    description: 'Calculate voltage, current, resistance, and power.',
    icon: '⚡',
    category: 'Fundamentals',
  },
  {
    href: '/calculators/resistor-color',
    name: 'Resistor Color Code',
    description: 'Decode resistor color bands to find resistance.',
    icon: '🎨',
    category: 'Components',
  },
  {
    href: '/calculators/voltage-divider',
    name: 'Voltage Divider',
    description: 'Calculate output voltage and power in divider circuits.',
    icon: '🔌',
    category: 'Circuits',
  },
  {
    href: '/calculators/dbm-watts',
    name: 'dBm to Watts',
    description: 'Convert between dBm and Watts for RF engineering.',
    icon: '📡',
    category: 'RF',
  },
  {
    href: '/calculators/led-resistor',
    name: 'LED Current Limiter',
    description: 'Calculate series resistor for LED circuits.',
    icon: '💡',
    category: 'Components',
  },
  {
    href: '/calculators/capacitor-charge',
    name: 'Capacitor Charge',
    description: 'RC time constant and charge/discharge times.',
    icon: '⏱',
    category: 'Components',
  },
]

const categories = [...new Set(calculators.map(c => c.category))]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ⚡ EE Calc
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Free electrical engineering calculators for students, hobbyists, and professionals.
          </p>
        </div>
      </header>

      {/* Stats */}
      <section className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-center gap-8 text-center text-sm">
            <div>
              <div className="text-2xl font-bold text-blue-400">{calculators.length}</div>
              <div className="text-gray-500">Calculators</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-gray-500">Free</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">No Ads</div>
              <div className="text-gray-500">Clean UI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {categories.map(cat => (
          <div key={cat} className="mb-10">
            <h2 className="text-lg font-medium text-gray-400 mb-4 uppercase tracking-wider">{cat}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {calculators
                .filter(c => c.category === cat)
                .map(calc => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 hover:bg-gray-750 transition group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{calc.icon}</span>
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-1">{calc.name}</h3>
                    <p className="text-sm text-gray-400">{calc.description}</p>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>Free electrical engineering calculators. Made for the EE community.</p>
        </div>
      </footer>
    </div>
  )
}
