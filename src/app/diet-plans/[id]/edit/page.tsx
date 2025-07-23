'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'

// 👇 Define the form type
interface DietPlanForm {
    weight: number
    height?: number
    bmi?: number
    calories?: number
    mealSchedule?: string
    notes?: string
}

export default function EditDietPlan() {
    const params = useParams()
    const router = useRouter()

    const id = params?.id as string
    const [form, setForm] = useState<DietPlanForm | null>(null)
    const [error, setError] = useState<string>('')

    // Fetch existing diet plan data
    useEffect(() => {
        if (!id) return
        fetch(`/api/diet-plans/${id}`)
            .then((res) => res.json())
            .then((data) => setForm(data))
            .catch(() => setError('Failed to load diet plan'))
    }, [id])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => (prev ? { ...prev, [name]: value } : prev))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!form) return

        const res = await fetch(`/api/diet-plans/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })

        if (!res.ok) {
            setError('Update failed')
            return
        }

        router.push('/diet-plans')
    }

    if (!form) return <p>Loading...</p>

    return (
        <div className="max-w-2xl mx-auto p-6 mt-12 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">✏️ Edit Diet Plan</h2>
            {error && <p className="text-red-600">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="weight"
                    type="number"
                    value={form.weight || ''}
                    onChange={handleChange}
                    placeholder="Weight"
                    className="w-full p-3 border rounded-xl"
                    required
                />

                <input
                    name="height"
                    type="number"
                    value={form.height || ''}
                    onChange={handleChange}
                    placeholder="Height"
                    className="w-full p-3 border rounded-xl"
                />

                <input
                    name="bmi"
                    type="number"
                    value={form.bmi || ''}
                    onChange={handleChange}
                    placeholder="BMI"
                    className="w-full p-3 border rounded-xl"
                />

                <input
                    name="calories"
                    type="number"
                    value={form.calories || ''}
                    onChange={handleChange}
                    placeholder="Calories"
                    className="w-full p-3 border rounded-xl"
                />

                <input
                    name="mealSchedule"
                    type="text"
                    value={form.mealSchedule || ''}
                    onChange={handleChange}
                    placeholder="Meal Schedule"
                    className="w-full p-3 border rounded-xl"
                />

                <textarea
                    name="notes"
                    value={form.notes || ''}
                    onChange={handleChange}
                    placeholder="Notes"
                    className="w-full p-3 border rounded-xl"
                />

                <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
                    Update
                </button>
            </form>
        </div>
    )
}
