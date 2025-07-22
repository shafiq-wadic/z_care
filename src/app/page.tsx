'use client'

import Link from 'next/link'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-4xl mx-auto">
                {/* Nav Header */}
                <nav className="bg-white shadow-lg rounded-2xl px-6 py-5 flex justify-between items-center mb-10">
                    <h1 className="text-2xl font-bold text-blue-600">🏥 HealthTrack</h1>
                    <div className="space-x-3">
                        <Link
                            href="/patients"
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                        >
                            Patients
                        </Link>
                        <Link
                            href="/diet-plans"
                            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
                        >
                            Diet Plans
                        </Link>
                        <Link
                            href="/prescriptions"
                            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
                        >
                            Prescriptions
                        </Link>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="bg-white shadow-lg rounded-2xl p-10 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Welcome to <span className="text-blue-600">HealthTrack</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Manage all your patient data, diet plans, prescriptions, and future appointment reminders — built for simplicity and speed.
                    </p>
                </div>
            </div>
        </div>
    )
}
