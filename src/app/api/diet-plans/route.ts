import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Input body types
type CreateDietPlanInput = {
    title: string
    description?: string
    startDate: string
    endDate?: string
    patientId: number
    days: {
        dayNumber: number
        meals: {
            time: string
            mealTypeId: number
            items: {
                itemId: number
                overrideQuantity?: string
                overrideCalories?: number
            }[]
        }[]
    }[]
}

// 📦 GET: All Diet Plans with Full Nested Data
export async function GET() {
    try {
        const plans = await prisma.dietPlan.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                patient: true,
                days: {
                    include: {
                        meals: {
                            include: {
                                mealType: true,
                                items: {
                                    include: {
                                        item: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        return NextResponse.json(plans)
    } catch (err) {
        console.error('GET DietPlans Error:', err)
        return NextResponse.json(
            { error: 'Failed to fetch diet plans' },
            { status: 500 }
        )
    }
}

// 📦 POST: Create New Diet Plan
export async function POST(req: Request) {
    try {
        const body: CreateDietPlanInput = await req.json()
        const { title, description, startDate, endDate, patientId, days } = body

        const createdPlan = await prisma.dietPlan.create({
            data: {
                title,
                description,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                patient: {
                    connect: { id: patientId }
                },
                days: {
                    create: days.map((day) => ({
                        dayNumber: day.dayNumber,
                        meals: {
                            create: day.meals.map((meal) => ({
                                time: meal.time,
                                mealType: {
                                    connect: { id: meal.mealTypeId }
                                },
                                items: {
                                    create: meal.items.map((item) => ({
                                        item: {
                                            connect: { id: item.itemId }
                                        },
                                        overrideQuantity: item.overrideQuantity,
                                        overrideCalories: item.overrideCalories
                                    }))
                                }
                            }))
                        }
                    }))
                }
            },
            include: {
                patient: true,
                days: {
                    include: {
                        meals: {
                            include: {
                                mealType: true,
                                items: {
                                    include: {
                                        item: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        return NextResponse.json(createdPlan)
    } catch (err) {
        console.error('POST DietPlan Error:', err)
        return NextResponse.json(
            { error: 'Failed to create diet plan' },
            { status: 500 }
        )
    }
}

// 🗑️ DELETE: By Diet Plan ID
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json()

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 })
        }

        await prisma.dietPlan.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('DELETE DietPlan Error:', err)
        return NextResponse.json(
            { error: 'Failed to delete diet plan' },
            { status: 500 }
        )
    }
}
