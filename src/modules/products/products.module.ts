import { PrismaService } from '@database/PrismaService';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [PrismaService, ProductsService],
})
export class ProductsModule {}
