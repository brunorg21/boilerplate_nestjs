import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import handleAccessControl from '@utils/HandleAccessControl';
import { RequestCreateCompanyDto } from './dto/request-create-company.dto';
import { ResponseCompanyDto } from './dto/response-company.dto';
import { ResponseListCompaniesDto } from './dto/response-list-companies.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@ApiTags('Empresas')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Rota para criação das empresas.', security: [{ bearerAuth: [] }] })
  @ApiBody({ type: RequestCreateCompanyDto })
  @ApiCreatedResponse({ type: ResponseCompanyDto })
  @HttpCode(HttpStatus.CREATED)
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async create(@Body() req: RequestCreateCompanyDto) {
    return this.companiesService.create(req);
  }

  @Get()
  @ApiOperation({ summary: 'Rota para listar empresas.', security: [{ bearerAuth: [] }] })
  @ApiOkResponse({ type: ResponseListCompaniesDto })
  @HttpCode(HttpStatus.OK)
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  async getCompanies() {
    return this.companiesService.getCompanies();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Rota para atualizar empresa pelo id.', security: [{ bearerAuth: [] }] })
  @ApiOkResponse({ type: ResponseCompanyDto })
  @ApiBody({ type: RequestCreateCompanyDto })
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async update(@CurrentUser() user: User, @Body() req, @Param('id', ParseIntPipe) id: number) {
    handleAccessControl.verifyCompanyOwnerRole(user, id);

    return this.companiesService.update(req, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Rota para deletar empresa pelo id.', security: [{ bearerAuth: [] }] })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async delete(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    handleAccessControl.verifyCompanyOwnerRole(user, id);

    return await this.companiesService.delete(id);
  }
}
