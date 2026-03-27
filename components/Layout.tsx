import { ReactNode } from 'react'
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode
  title: string
  description: string
}

export default function Layout({ children, title, description }: LayoutProps) {
  const calculators = [
    { href: '/calculators/ohms-law', name: "Ohm's Law", icon: '⚡' },
    { href: '/calculators/resistor-color', name: 'Resistor Color Code', icon: '🎨' },
    { href: '/calculators/voltage-divider', name: 'Voltage Divider', icon: '🔌' },
    { href: '/calculators/dbm-watts', name: 'dBm to Watts', icon: '📡' },
    { href: '/calculators/led-resistor', name: 'LED Current Limiter', icon: '💡' },
    { href: '/calculators/capacitor-charge', name: 'Capacitor Charge', icon: '⏱' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
              ⚡ EE Calc
            </Link>
            <nav className="hidden md:flex gap-6 text-sm">
              {calculators.map(c => (
                <Link key={c.href} href={c.href} className="text-gray-400 hover:text-white transition">
                  {c.icon} {c.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400">{description}</p>
        </div>
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>Free electrical engineering calculators. Made with ⚡</p>
        </div>
      </footer>
    </div>
  )
}
