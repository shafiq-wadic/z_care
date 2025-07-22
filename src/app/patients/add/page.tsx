'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type PatientForm = {
    name: string
    age: number | ''
    gender: string
    email: string
    phone: string
    diabetesType: string
    // dietPlan: string
}

export default function AddPatientPage() {
    const router = useRouter()

    const [formData, setFormData] = useState<PatientForm>({
        name: '',
        age: '',
        gender: '',
        email: '',
        phone: '',
        diabetesType: '',
        // dietPlan: '',
    })

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [serverError, setServerError] = useState<string | null>(null)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: name === 'age' ? Number(value) : value,
        }))

        setErrors((prev) => ({ ...prev, [name]: '' }))
        setServerError(null)
    }

    const validate = () => {
        const newErrors: { [key: string]: string } = {}

        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.age) newErrors.age = 'Age is required'
        if (!formData.gender) newErrors.gender = 'Gender is required'
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = 'Invalid email'
        if (formData.phone && !/^[0-9+()\-\s]+$/.test(formData.phone))
            newErrors.phone = 'Invalid phone number'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setServerError(null)

        if (!validate()) return

        setLoading(true)

        try {
            const res = await fetch('/api/patients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData?.message || 'Failed to save patient')
            }

            router.push('/patients')
        } catch (err: any) {
            console.error('❌ Submission error:', err)
            setServerError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8 text-center">🩺 Add Patient Info</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl p-8 space-y-5"
            >
                {serverError && (
                    <p className="text-red-600 font-medium text-center">
                        ⚠️ {serverError}
                    </p>
                )}

                <div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                    )}
                </div>

                <div>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.age && (
                        <p className="text-sm text-red-600 mt-1">{errors.age}</p>
                    )}
                </div>

                <div>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && (
                        <p className="text-sm text-red-600 mt-1">{errors.gender}</p>
                    )}
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                    )}
                </div>

                <div>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                    )}
                </div>

                <div>
                    <select
                        name="diabetesType"
                        value={formData.diabetesType}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Diabetes Type</option>
                        <option value="Type 1">Type 1</option>
                        <option value="Type 2">Type 2</option>
                        <option value="Gestational">Gestational</option>
                        <option value="None">None</option>
                    </select>
                </div>

                {/* <textarea
                    name="dietPlan"
                    value={formData.dietPlan}
                    onChange={handleChange}
                    placeholder="Diet Plan or Special Notes"
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                /> */}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Submit Info'}
                </button>
            </form>
        </div>
    )
}
