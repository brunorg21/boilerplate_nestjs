import { PrismaClient } from '@prisma/client';

export async function seedProducts(prisma: PrismaClient) {
  const company = await prisma.company.findFirst();

  await prisma.product.createMany({
    data: [
      {
        name: 'Product One',
        description: 'Description for Product One',
        price: 100.0,
        companyId: company?.id,
      },
      {
        name: 'Product Two',
        description: 'Description for Product Two',
        price: 200.0,
        companyId: company?.id,
      },
    ],
  });

  console.log('Products seed added successfully 🌱.');
}
