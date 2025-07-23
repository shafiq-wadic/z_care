// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Diabetes Tracker',
    description: 'Manage patients and monitor diabetes info.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-gray-100 min-h-screen">
                <Navbar />
                <main className="pt-24 px-6 max-w-7xl mx-auto">{children}</main>
            </body>
        </html>
    )
}

function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 text-blue-600 font-bold text-xl">
                    <span>🩺</span>
                    <span>Diabetes Tracker</span>
                </Link>

                {/* Navigation Menu */}
                <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
                    <Link
                        href="/patients"
                        className="hover:text-blue-600 transition"
                    >
                        Patients
                    </Link>
                    <Link
                        href="/patients/add"
                        className="hover:text-blue-600 transition"
                    >
                        Add Patient
                    </Link>
                    <Link
                        href="/diet-plans"
                        className="hover:text-blue-600 transition"
                    >
                        Diet Plans
                    </Link>
                    <Link
                        href="/prescriptions"
                        className="hover:text-blue-600 transition"
                    >
                        Prescriptions
                    </Link>
                    <Link
                        href="/pay-slips"
                        className="hover:text-blue-600 transition"
                    >
                        Pay Slips
                    </Link>
                </div>

                {/* Right side: Account / Auth Buttons */}
                <div className="flex items-center space-x-3">
                    <Link
                        href="/account"
                        className="text-sm font-medium text-gray-700 hover:text-blue-600"
                    >
                        Account
                    </Link>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
                        Logout
                    </button>
                </div>
            </nav>
        </header>
    )
}
