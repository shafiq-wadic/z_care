'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Patient } from '@/types/patient'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'

export default function PatientsPage() {
    const [patients, setPatients] = useState<Patient[]>([])
    const [loading, setLoading] = useState(true)

    // Modal state
    const [showModal, setShowModal] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

    useEffect(() => {
        fetch('/api/patients')
            .then((res) => res.json())
            .then((data) => setPatients(data))
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = async (id: number) => {
        await fetch(`/api/patients/${id}`, {
            method: 'DELETE',
        })
        setPatients((prev) => prev.filter((p) => p.id !== id))
    }

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">👨‍⚕️ Patients</h1>
                <Link
                    href="/patients/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                >
                    + Add Patient
                </Link>
            </div>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : patients.length === 0 ? (
                <p className="text-gray-600">No patients yet.</p>
            ) : (
                <ul className="space-y-4">
                    {patients.map((patient) => (
                        <li
                            key={patient.id}
                            className="p-5 border rounded-lg flex justify-between items-start bg-white shadow-sm"
                        >
                            <div>
                                <h2 className="text-xl font-semibold">{patient.name}</h2>
                                <p className="text-sm text-gray-600">
                                    Age: {patient.age} | Gender: {patient.gender}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Diabetes Type: {patient.diabetesType || 'N/A'}
                                </p>
                                {patient.dietPlan && (
                                    <p className="text-sm text-gray-600">
                                        Diet Plan: {patient.dietPlan}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={`/patients/${patient.id}/edit`}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => {
                                        setSelectedPatient(patient)
                                        setShowModal(true)
                                    }}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal */}
            <ConfirmDeleteModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                    setSelectedPatient(null)
                }}
                onConfirm={() => {
                    if (selectedPatient) handleDelete(selectedPatient.id)
                }}
                itemName={selectedPatient?.name || 'this patient'}
            />
        </div>
    )
}
