import { PrismaService } from '@database/PrismaService';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Role, User } from '@prisma/client';

class HandleAccessControl {
  constructor(private readonly prisma: PrismaService) {}

  verifyAdminRole(payload: Partial<User>): void {
    const { role } = payload;

    if (role !== Role.Master && role !== Role.Admin) {
      throw new ForbiddenException('Acesso não autorizado.');
    }
  }

  async verifyCompanyOwnerRole(payload: Partial<User>, companyId: number): Promise<void> {
    const { role, id } = payload;

    if (role !== Role.CompanyOwner) {
      throw new ForbiddenException('Acesso não autorizado.');
    }

    const company = await this.prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (company.ownerId !== id) {
      throw new ForbiddenException('Acesso não autorizado.');
    }
  }

  async verifyProductBelongsToCompanyOwner(
    payload: Partial<User>,
    productId: number,
  ): Promise<void> {
    const { role, id } = payload;

    if (role !== Role.CompanyOwner) {
      throw new ForbiddenException('Acesso não autorizado.');
    }

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { company: true },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    if (!product.company || product.company.ownerId !== id) {
      throw new ForbiddenException(
        'Acesso não autorizado. Você não é dono da empresa deste produto.',
      );
    }
  }

  async verifyPermission(payload: Partial<User>, permission: string): Promise<void> {
    const { id } = payload;

    const user = await this.prisma.user.findFirst({
      where: { id },
      include: { adminPermissions: true },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const validPermission: boolean = user.adminPermissions.some(({ name }) => name === permission);

    if (!validPermission) throw new ForbiddenException('Acesso não autorizado.');
  }
}

export default new HandleAccessControl(new PrismaService());
