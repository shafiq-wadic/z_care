'use client'

export default function HomePage() {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-10 text-center" >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to <span className="text-blue-600">HealthTrack</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Manage all your patient data, diet plans, prescriptions, and future appointment reminders — built for simplicity and speed.
            </p>
        </div>
    )
}
