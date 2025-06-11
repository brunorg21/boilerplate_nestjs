import { ApiProperty } from '@nestjs/swagger';
import { ResponseCompanyDto } from './response-company.dto';

export class ResponseListCompaniesDto {
  @ApiProperty({ type: [ResponseCompanyDto] })
  companies: ResponseCompanyDto[];
}
