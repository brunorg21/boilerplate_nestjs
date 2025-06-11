import { ApiProperty } from '@nestjs/swagger';
import { ResponseProductDto } from './response-product.dto';

export class ResponseListProductsDto {
  @ApiProperty({ type: [ResponseProductDto] })
  products: ResponseProductDto[];
}
