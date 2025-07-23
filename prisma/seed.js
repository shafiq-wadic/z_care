import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Patients
    await prisma.patient.createMany({
        data: [
            {
                name: 'John Doe',
                age: 45,
                gender: 'Male',
                email: 'john@example.com',
                phone: '1234567890',
                diabetesType: 'Type 2',
                height: 175.5,
                weight: 78.0
            },
            {
                name: 'Jane Smith',
                age: 32,
                gender: 'Female',
                email: 'jane@example.com',
                phone: '0987654321',
                diabetesType: 'Type 1',
                height: 165.2,
                weight: 60.0
            }
        ],
        skipDuplicates: true
    })

    // Meal Types
    await prisma.mealType.createMany({
        data: [
            { name: 'Breakfast', time: '08:00' },
            { name: 'Lunch', time: '13:00' },
            { name: 'Snacking', time: '16:00' },
            { name: 'Dinner', time: '19:30' },
            { name: 'Late Night Snacking', time: '22:00' }
        ],
        skipDuplicates: true
    })

    // Meal Items
    await prisma.mealItem.createMany({
        data: [
            { name: 'Boiled Egg', quantity: '2 pieces', calories: 140, protein: 12, carbs: 1, fat: 10 },
            { name: 'Grilled Chicken Breast', quantity: '100g', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
            { name: 'Avocado Slice', quantity: '1/2 avocado', calories: 120, protein: 1.5, carbs: 6, fat: 10 },
            { name: 'Brown Rice', quantity: '1 cup', calories: 215, protein: 5, carbs: 45, fat: 1.8 },
            { name: 'Steamed Broccoli', quantity: '1 cup', calories: 55, protein: 4.5, carbs: 11, fat: 0.5 },
            { name: 'Apple', quantity: '1 medium', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
            { name: 'Peanut Butter', quantity: '2 tbsp', calories: 190, protein: 7, carbs: 6, fat: 16 }
        ],
        skipDuplicates: true
    })

    console.log('✅ Seeding completed')
}

main()
    .catch(e => {
        console.error('❌ Error seeding:', e)
        process.exit(1)
    })
    .finally(() => {
        console.error('*********END********')
        prisma.$disconnect()
    })
