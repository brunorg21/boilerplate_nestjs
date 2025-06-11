import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ResponseAllUsersDto } from './dto/response-all-users.dto';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('owners')
  @ApiOperation({ summary: 'Rota para listar proprietários.', security: [{ bearerAuth: [] }] })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ResponseAllUsersDto })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  async getOwners() {
    return await this.usersService.getOwners();
  }
}
