import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const patient = await prisma.patient.findUnique({ where: { id: Number(id) } })
    return NextResponse.json(patient)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json()
    const updated = await prisma.patient.update({
        where: { id: Number(id) },
        data: body,
    })
    return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await prisma.patient.delete({ where: { id: Number(id) } })
    return NextResponse.json({ message: 'Patient deleted' })
}