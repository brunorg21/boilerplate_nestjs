import { ApiProperty } from '@nestjs/swagger';
import { ResponseAllUserDto } from 'src/modules/admin/admin-settings/dto/response-all-user.dto';

export class ResponseAllUsersDto {
  @ApiProperty({ type: [ResponseAllUserDto] })
  users: ResponseAllUserDto[];
}
