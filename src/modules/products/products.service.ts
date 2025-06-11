import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/PrismaService';
import { RequestCreateProductDto } from './dto/request-create-product.dto';
import { ResponseProductDto } from './dto/response-product.dto';
import { ResponseListProductsDto } from './dto/response-list-products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(request: RequestCreateProductDto): Promise<ResponseProductDto> {
    const companyToRelated = await this.prismaService.company.findUnique({
      where: { id: request.companyId },
    });

    if (!companyToRelated) {
      throw new NotFoundException('Empresa não encontrada');
    }

    const product = await this.prismaService.product.create({
      data: {
        ...request,
      },
    });

    return {
      id: product.id,
      name: product.name,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      companyId: product.companyId,
      description: product.description,
      price: Number(product.price),
    };
  }

  async getProductsByCompanyId(companyId: number): Promise<ResponseListProductsDto> {
    const company = await this.prismaService.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    const products = await this.prismaService.product.findMany({
      where: {
        companyId,
      },
    });
    return {
      products: products.map((p) => ({
        ...p,
        price: Number(p.price),
      })),
    };
  }

  async delete(productId: number): Promise<void> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrada');
    }

    await this.prismaService.product.delete({
      where: {
        id: product.id,
      },
    });
  }

  async update(request: RequestCreateProductDto, productId: number): Promise<ResponseProductDto> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrada');
    }

    const updatedProduct = await this.prismaService.product.update({
      where: {
        id: productId,
      },
      data: request,
    });

    return {
      id: updatedProduct.id,
      name: updatedProduct.name,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
      companyId: updatedProduct.companyId,
      description: updatedProduct.description,
      price: Number(updatedProduct.price),
    };
  }
}
