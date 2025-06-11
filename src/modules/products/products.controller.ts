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

import { ProductsService } from './products.service';
import { RequestCreateProductDto } from './dto/request-create-product.dto';
import { ResponseProductDto } from './dto/response-product.dto';
import { ResponseListProductsDto } from './dto/response-list-products.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import handleAccessControl from '@utils/HandleAccessControl';

@ApiTags('Produtos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Rota para criação dos produtos.', security: [{ bearerAuth: [] }] })
  @ApiBody({ type: RequestCreateProductDto })
  @ApiCreatedResponse({ type: ResponseProductDto })
  @HttpCode(HttpStatus.CREATED)
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async create(@Body() req: RequestCreateProductDto) {
    return this.productsService.create(req);
  }

  @Get('company/:id')
  @ApiOperation({
    summary: 'Rota para listar produtos por id da empresa.',
    security: [{ bearerAuth: [] }],
  })
  @ApiOkResponse({ type: ResponseListProductsDto })
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async getProductsByCompany(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    handleAccessControl.verifyCompanyOwnerRole(user, id);
    return this.productsService.getProductsByCompanyId(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Rota para deletar produto pelo id.', security: [{ bearerAuth: [] }] })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async delete(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    handleAccessControl.verifyProductBelongsToCompanyOwner(user, id);
    return await this.productsService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Rota para atualizar produto pelo id.', security: [{ bearerAuth: [] }] })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ResponseProductDto })
  @ApiBody({ type: RequestCreateProductDto })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async update(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number, @Body() req) {
    handleAccessControl.verifyProductBelongsToCompanyOwner(user, id);
    return await this.productsService.update(req, id);
  }
}
