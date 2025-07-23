import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 🟢 GET all meal items
export async function GET() {
    try {
        const mealItems = await prisma.mealItem.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(mealItems)
    } catch (error) {
        console.error('GET MealItems Error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch meal items' },
            { status: 500 }
        )
    }
}

// 🟡 POST create a new meal item
export async function POST(req: Request) {
    try {
        const {
            name,
            quantity,
            calories,
            protein,
            carbs,
            fat
        }: {
            name: string
            quantity: string
            calories?: number
            protein?: number
            carbs?: number
            fat?: number
        } = await req.json()

        // Check if it already exists
        const existing = await prisma.mealItem.findUnique({
            where: { name }
        })
        if (existing) {
            return NextResponse.json({ error: 'Meal item already exists' }, { status: 400 })
        }

        const newItem = await prisma.mealItem.create({
            data: {
                name,
                quantity,
                calories,
                protein,
                carbs,
                fat
            }
        })

        return NextResponse.json(newItem)
    } catch (error) {
        console.error('POST MealItem Error:', error)
        return NextResponse.json(
            { error: 'Failed to create meal item' },
            { status: 500 }
        )
    }
}

// 🔴 DELETE meal item by ID
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json()

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 })
        }

        await prisma.mealItem.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('DELETE MealItem Error:', error)
        return NextResponse.json(
            { error: 'Failed to delete meal item' },
            { status: 500 }
        )
    }
}
