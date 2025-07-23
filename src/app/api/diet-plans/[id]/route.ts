import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const plan = await prisma.dietPlan.findUnique({ where: { id: Number(id) }, include: { patient: true } })
    return NextResponse.json(plan)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await req.json()
    const updated = await prisma.dietPlan.update({ where: { id: Number(id) }, data })
    return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await prisma.dietPlan.delete({ where: { id: Number(id) } })
    return NextResponse.json({ ok: true })
}
