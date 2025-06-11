import { PrismaClient, Role } from '@prisma/client';

export async function seedCompanies(prisma: PrismaClient) {
  const owner = await prisma.user.findFirst({
    where: {
      role: Role.CompanyOwner,
    },
  });

  await prisma.company.createMany({
    data: [
      {
        name: 'Company One',
        ownerId: owner?.id,
      },
      {
        name: 'Company Two',
        ownerId: owner?.id,
      },
    ],
  });

  console.log('Companies seed added successfully 🌱.');
}
