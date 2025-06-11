import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/PrismaService';
import { RequestCreateCompanyDto } from './dto/request-create-company.dto';
import { ResponseCompanyDto } from './dto/response-company.dto';
import { ResponseListCompaniesDto } from './dto/response-list-companies.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(request: RequestCreateCompanyDto): Promise<ResponseCompanyDto> {
    const owner = await this.prismaService.user.findUnique({
      where: { id: request.ownerId, role: 'CompanyOwner' },
    });

    if (!owner) {
      throw new NotFoundException('Proprietário não econtrado');
    }

    const company = await this.prismaService.company.create({
      data: {
        ...request,
      },
    });

    return {
      id: company.id,
      name: company.name,
      ownerId: company.ownerId,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  }

  async getCompanies(): Promise<ResponseListCompaniesDto> {
    const companies = await this.prismaService.company.findMany();
    return {
      companies,
    };
  }

  async update(request: RequestCreateCompanyDto, companyId: number): Promise<ResponseCompanyDto> {
    const company = await this.prismaService.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    const updatedCompany = await this.prismaService.company.update({
      where: {
        id: companyId,
      },
      data: request,
    });

    return {
      id: updatedCompany.id,
      name: updatedCompany.name,
      ownerId: updatedCompany.ownerId,
      createdAt: updatedCompany.createdAt,
      updatedAt: updatedCompany.updatedAt,
    };
  }

  async delete(companyId: number): Promise<void> {
    const company = await this.prismaService.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    await this.prismaService.company.delete({
      where: {
        id: company.id,
      },
    });
  }
}
