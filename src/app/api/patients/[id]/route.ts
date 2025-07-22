import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const patient = await prisma.patient.findUnique({ where: { id: Number(params.id) } })
    return NextResponse.json(patient)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json()
    const updated = await prisma.patient.update({
        where: { id: Number(params.id) },
        data: body,
    })
    return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    await prisma.patient.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ message: 'Patient deleted' })
}
