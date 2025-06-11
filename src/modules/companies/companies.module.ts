import { PrismaService } from '@database/PrismaService';
import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';

@Module({
  imports: [],
  controllers: [CompaniesController],
  providers: [PrismaService, CompaniesService],
})
export class CompaniesModule {}
