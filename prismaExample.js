import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.customers.findMany({
    orderBy: [
      { first_name: "asc"}
    ]
  })
  console.log(users)

  const revenue = await prisma.orders.findMany({
    select: {
      order_id: true,
      customer_id: true,
      order_date: true

    },
  })
  console.log(revenue)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })