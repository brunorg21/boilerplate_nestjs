import { PrismaClient, Role, Status } from '@prisma/client';
import { hashSync } from 'bcrypt';

export async function seedOwner(prisma: PrismaClient) {
  await prisma.user.createMany({
    data: [
      {
        name: 'user owner',
        email: 'user.owner@email.com',
        password: hashSync('12345678', 10),
        role: Role.CompanyOwner,
        status: Status.Active,
      },
    ],
  });

  console.log('Owners seed added successfully 🌱.');
}
