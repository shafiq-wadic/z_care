'use client'

import { MealItemType } from '@/types/mealItem'
import { useState, useEffect, FormEvent } from 'react'
import { v4 as uuid } from 'uuid'

// --- Types ---
interface Patient {
    id: number
    name: string
}

interface MealType {
    id: number
    name: string
}

interface MealItem {
    id: number
    name: string
    quantity?: string
    calories?: number
}

interface MealItemInput {
    itemId: string
    quantity: string
    calories: string
}

interface MealInput {
    id: string
    mealTypeId: string
    time: string
    items: MealItemInput[]
}

interface DietPlanForm {
    patientId: string
    title: string
    description: string
    startDate: string
    endDate: string
    meals: MealInput[]
}
interface MealItemInput {
    itemId: string;
    quantity: string;
    calories: string;
}

// --- Component ---
export default function CreateDietPlan() {
    const [patients, setPatients] = useState<Patient[]>([])
    const [mealTypes, setMealTypes] = useState<MealType[]>([])
    const [mealItems, setMealItems] = useState<MealItem[]>([])

    const [form, setForm] = useState<DietPlanForm>({
        patientId: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        meals: [],
    })

    const [newItemModal, setNewItemModal] = useState<{ mealId: string; index: number } | null>(null)
    const [newItemName, setNewItemName] = useState('')
    const [newItemQty, setNewItemQty] = useState('')
    const [newItemCal, setNewItemCal] = useState('')

    // --- Fetch on load ---
    useEffect(() => {
        Promise.all([
            fetch('/api/patients').then(res => res.json()),
            fetch('/api/meal-types').then(res => res.json()),
            fetch('/api/meal-items').then(res => res.json()),
        ]).then(([patients, types, items]) => {
            setPatients(patients)
            setMealTypes(types)
            setMealItems(items)
        })
    }, [])

    // --- Meal Helpers ---
    const addMeal = () => {
        setForm(prev => ({
            ...prev,
            meals: [
                ...prev.meals,
                { id: uuid(), mealTypeId: '', time: new Date().toTimeString().slice(0, 5), items: [] }
            ]
        }))
    }

    const updateMeal = (mealId: string, field: keyof MealInput, val: string|MealItemInput[]|number) => {
        setForm(prev => ({
            ...prev,
            meals: prev.meals.map(m => m.id === mealId ? { ...m, [field]: val } : m)
        }))
    }

    // --- Item Helpers ---
    const addItem = (mealId: string) => {
        updateMeal(mealId, 'items', [
            ...form.meals.find(m => m.id === mealId)!.items,
            { itemId: '', quantity: '', calories: '' }
        ])
    }

    const updateItem = (mealId: string, idx: number, field: keyof MealItemInput, val: string | MealItemInput[] | number) => {
        setForm(prev => ({
            ...prev,
            meals: prev.meals.map(m => {
                if (m.id !== mealId) return m
                const updatedItems = m.items.map((it, i) =>
                    i === idx ? { ...it, [field]: val } : it
                )
                return { ...m, items: updatedItems }
            })
        }))
    }

    const totalCalories = (items: MealItemInput[]) =>
        items.reduce((sum, item) => sum + (parseInt(item.calories) || 0), 0)

    // --- New Item Modal ---
    const openNewItem = (mealId: string, idx: number) => {
        setNewItemModal({ mealId, index: idx })
        setNewItemName('')
        setNewItemQty('')
        setNewItemCal('')
    }

    const createNewItem = async () => {
        const res = await fetch('/api/meal-items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: newItemName,
                quantity: newItemQty,
                calories: parseInt(newItemCal),
            }),
        })

        if (!res.ok) return alert('Failed to create item')

        const item = await res.json()
        setMealItems(prev => [...prev, item])

        if (newItemModal) {
            updateItem(newItemModal.mealId, newItemModal.index, 'itemId', String(item.id))
            setNewItemModal(null)
        }
    }

    // --- Submit ---
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const payload = {
            patientId: Number(form.patientId),
            title: form.title,
            description: form.description,
            startDate: form.startDate,
            endDate: form.endDate,
            days: [
                {
                    dayNumber: 1,
                    meals: form.meals.map(m => ({
                        mealType: mealTypes.find(mt => mt.id === Number(m.mealTypeId))?.name || '',
                        time: m.time,
                        items: m.items.map(it => ({
                            name: mealItems.find(mi => mi.id === Number(it.itemId))?.name || '',
                            quantity: it.quantity,
                            calories: Number(it.calories)
                        }))
                    }))
                }
            ]
        }

        const res = await fetch('/api/diet-plans', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (res.ok) {
            alert('Created!')
            window.location.href = '/diet-plans'
        } else {
            alert('Error creating plan')
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6 mt-12 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">➕ New Diet Plan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })} required className="w-full p-3 border rounded-xl">
                    <option value="">Select Patient</option>
                    {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                    required className="w-full p-3 border rounded-xl" />
                <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full p-3 border rounded-xl" />
                <div className="grid grid-cols-2 gap-4">
                    <input type="date" required value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })}
                        className="w-full p-3 border rounded-xl" />
                    <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })}
                        className="w-full p-3 border rounded-xl" />
                </div>

                {form.meals.map((meal, mIdx) =>
                    <div key={meal.id} className="border p-4 mb-4 rounded-xl bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                            <p className="font-semibold">Meal #{mIdx + 1}</p>
                            <button type="button" className="text-red-500 hover:underline text-sm"
                                onClick={() => setForm({ ...form, meals: form.meals.filter((_, i) => i !== mIdx) })}>Remove Meal</button>
                        </div>

                        <div className="flex gap-4 mb-2">
                            <select value={meal.mealTypeId} onChange={e => updateMeal(meal.id, 'mealTypeId', e.target.value)}
                                required className="flex-1 p-2 border rounded">
                                <option value="">Meal Type</option>
                                {mealTypes.map(mt => <option key={mt.id} value={mt.id}>{mt.name}</option>)}
                            </select>
                            <input type="time" value={meal.time} onChange={e => updateMeal(meal.id, 'time', e.target.value)}
                                className="p-2 border rounded" />
                        </div>

                        {meal.items.map((it: MealItemInput, iIdx: number) =>
                            <div key={iIdx} className="grid grid-cols-3 gap-2 mb-2">
                                <select value={it.itemId} onChange={e => {
                                    if (e.target.value === '__new') openNewItem(meal.id, iIdx)
                                    else updateItem(meal.id, iIdx, 'itemId', e.target.value)
                                }} required className="p-2 border rounded">
                                    <option value="">Select Item</option>
                                    {mealItems.map(mi => <option key={mi.id} value={mi.id}>{mi.name}</option>)}
                                    <option value="__new">+ Create New Item</option>
                                </select>
                                <input placeholder="Quantity" value={it.quantity} onChange={e => updateItem(meal.id, iIdx, 'quantity', e.target.value)}
                                    className="p-2 border rounded" />
                                <input placeholder="Cal" type="number" value={it.calories} onChange={e => updateItem(meal.id, iIdx, 'calories', e.target.value)}
                                    className="p-2 border rounded" />
                            </div>
                        )}

                        <button type="button" className="text-blue-600 text-sm hover:underline"
                            onClick={() => addItem(meal.id)}>➕ Add Item</button>

                        <div className="text-right mt-2 font-medium">Total: {totalCalories(meal.items)} kcal</div>
                    </div>
                )}

                <button type="button" className="text-blue-600 hover:underline text-sm" onClick={addMeal}>➕ Add Meal</button>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">Create Plan</button>
            </form>

            {newItemModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white p-6 rounded-xl max-w-sm w-full space-y-4">
                        <h3 className="text-lg font-semibold">Add New Meal Item</h3>
                        <input placeholder="Name" value={newItemName} onChange={e => setNewItemName(e.target.value)} className="w-full p-2 border rounded" />
                        <input placeholder="Quantity" value={newItemQty} onChange={e => setNewItemQty(e.target.value)} className="w-full p-2 border rounded" />
                        <input placeholder="Calories" type="number" value={newItemCal} onChange={e => setNewItemCal(e.target.value)} className="w-full p-2 border rounded" />
                        <div className="flex justify-end gap-2">
                            <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setNewItemModal(null)}>Cancel</button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={createNewItem}>Add</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
