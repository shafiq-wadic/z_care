// types/patient.ts
export type Patient = {
    id: number
    name: string
    age: number
    gender: string
    email?: string | null
    phone?: string | null
    diabetesType?: string | null
    dietPlan?: string | null
    createdAt: string
    updatedAt: string
}
