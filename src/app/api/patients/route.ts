import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    const patients = await prisma.patient.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(patients)
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()

        // Basic validation (optional but smart)
        if (!data.name || !data.email) {
            return NextResponse.json(
                { error: 'Name and email are required.' },
                { status: 400 }
            )
        }

        // Create new patient
        const newPatient = await prisma.patient.create({
            data,
        })

        return NextResponse.json(newPatient, { status: 201 })
    } catch (error) {
        console.error('[POST ERROR]', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 }
        )
    }
}
