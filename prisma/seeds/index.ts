import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './admin.seeds';
import { seedUser } from './user.seeds';
import { seedText } from './text.seeds';
import { seedOwner } from './owner.seeds';
import { seedCompanies } from './company.seeds';
import { seedProducts } from './product.seeds';

const prisma = new PrismaClient();

async function main() {
  await seedOwner(prisma);
  await seedAdmin(prisma);
  await seedUser(prisma);
  await seedCompanies(prisma);
  await seedProducts(prisma);
  await seedText(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
