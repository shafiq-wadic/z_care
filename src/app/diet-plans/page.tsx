'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface DietItem {
    item?: {
        name: string
    }
    overrideCalories?: number
}

interface DietMeal {
    mealType?: {
        name: string
    }
    time: string
    items: DietItem[]
}

interface DietDay {
    meals: DietMeal[]
}

interface DietPlan {
    id: number
    title: string
    startDate: string
    endDate?: string
    patient?: {
        name: string
    }
    days: DietDay[]
}

export default function DietPlansPage() {
    const [plans, setPlans] = useState<DietPlan[]>([])

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch('/api/diet-plans')
                const data = await res.json()
                if (!data?.error) {
                    setPlans(data)
                }
            } catch (error) {
                console.error('Failed to fetch plans:', error)
                setPlans([])
            }
        }

        fetchPlans()
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 All Diet Plans</h2>
                <Link
                    href="/diet-plans/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    ➕ New Plan
                </Link>
            </div>

            {plans.length === 0 && (
                <div className="text-gray-500">No diet plans found.</div>
            )}

            <div className="grid gap-6">
                {plans.map((plan) => {
                    const firstDay = plan.days?.[0]
                    const totalCalories =
                        firstDay?.meals?.reduce((sum, meal) => {
                            return (
                                sum +
                                meal.items?.reduce(
                                    (s, it) => s + (it.overrideCalories || 0),
                                    0
                                )
                            )
                        }, 0) || 0

                    return (
                        <div
                            key={plan.id}
                            className="border p-6 rounded-xl shadow-sm bg-white"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-semibold text-blue-700">
                                    {plan.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Patient:{' '}
                                    <span className="font-medium">
                                        {plan.patient?.name || 'Unknown'}
                                    </span>
                                </p>
                            </div>

                            <p className="text-sm text-gray-500">
                                {new Date(plan.startDate).toLocaleDateString()} ➡️{' '}
                                {plan.endDate
                                    ? new Date(plan.endDate).toLocaleDateString()
                                    : 'Ongoing'}
                            </p>

                            {firstDay?.meals?.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-semibold mb-2">🗓️ Day 1 Meals:</h4>
                                    <div className="grid gap-2">
                                        {firstDay.meals.map((meal, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3 border rounded-md bg-gray-50"
                                            >
                                                <div className="flex justify-between">
                                                    <p>
                                                        <strong>{meal.mealType?.name}</strong> at {meal.time}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {meal.items?.length} items
                                                    </p>
                                                </div>
                                                <ul className="pl-4 mt-1 text-sm text-gray-700 list-disc">
                                                    {meal.items?.map((it, i) => (
                                                        <li key={i}>
                                                            {it.item?.name || 'Unknown'} -{' '}
                                                            {it.overrideCalories || 0} kcal
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-2 text-right font-medium text-green-700">
                                        Total: {totalCalories} kcal
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
