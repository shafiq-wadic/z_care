import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all meal types
export async function GET() {
    try {
        const mealTypes = await prisma.mealType.findMany({
            orderBy: { createdAt: 'asc' }
        })
        return NextResponse.json(mealTypes)
    } catch (error) {
        console.error('GET MealTypes Error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch meal types' },
            { status: 500 }
        )
    }
}

// POST create new meal type
export async function POST(req: Request) {
    try {
        const {
            name,
            time
        }: {
            name: string
            time: string
        } = await req.json()

        if (!name || !time) {
            return NextResponse.json({ error: 'Name and time are required' }, { status: 400 })
        }

        // Check for duplicates
        const existing = await prisma.mealType.findUnique({
            where: { name }
        })
        if (existing) {
            return NextResponse.json({ error: 'Meal type already exists' }, { status: 400 })
        }

        const newMealType = await prisma.mealType.create({
            data: { name, time }
        })

        return NextResponse.json(newMealType)
    } catch (error) {
        console.error('POST MealType Error:', error)
        return NextResponse.json(
            { error: 'Failed to create meal type' },
            { status: 500 }
        )
    }
}

// DELETE a meal type by ID
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json()

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 })
        }

        await prisma.mealType.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('DELETE MealType Error:', error)
        return NextResponse.json(
            { error: 'Failed to delete meal type' },
            { status: 500 }
        )
    }
}
