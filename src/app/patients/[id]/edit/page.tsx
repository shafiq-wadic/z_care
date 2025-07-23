'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

type PatientForm = {
    name: string
    age: number | ''
    gender: string
    email: string
    phone: string
    diabetesType: string
}

export default function EditPatientPage() {
    const { id } = useParams()
    const router = useRouter()

    const [formData, setFormData] = useState<PatientForm>({
        name: '',
        age: '',
        gender: '',
        email: '',
        phone: '',
        diabetesType: '',
    })

    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const res = await fetch(`/api/patients/${id}`)
                if (!res.ok) throw new Error('Failed to load patient')
                const data = await res.json()

                setFormData({
                    name: data.name || '',
                    age: data.age || '',
                    gender: data.gender || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    diabetesType: data.diabetesType || '',
                })
            } catch (err) {
                setErrorMsg('Could not load patient info.')
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchPatient()
    }, [id])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'age' ? Number(value) : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setErrorMsg(null)

        if (!formData.name || !formData.age || !formData.gender) {
            setErrorMsg('Name, age, and gender are required!')
            setSubmitting(false)
            return
        }

        try {
            const res = await fetch(`/api/patients/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!res.ok) {
                const errData = await res.json()
                throw new Error(errData.message || 'Update failed')
            }

            router.push('/patients')
        } catch (err) {
            if (err instanceof Error) {
                setErrorMsg(err.message)
            } else {
                setErrorMsg('Something went wrong. Try again.')
            }
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <div className="text-center py-10">⏳ Loading patient info...</div>

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8 text-center">✏️ Edit Patient Info</h1>

            {errorMsg && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4">
                    {errorMsg}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl p-8 space-y-5"
            >
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    name="diabetesType"
                    value={formData.diabetesType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Diabetes Type</option>
                    <option value="Type 1">Type 1</option>
                    <option value="Type 2">Type 2</option>
                    <option value="Gestational">Gestational</option>
                </select>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {submitting ? 'Updating...' : 'Update Info'}
                </button>
            </form>
        </div>
    )
}
