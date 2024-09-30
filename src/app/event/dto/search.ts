import { ApiProperty } from "@nestjs/swagger";
import { IsEthereumAddress, IsString } from "class-validator";
import { Transform } from "class-transformer";

import { IEventSearchDto } from "../interfaces";
import { PaginationDto } from "./pagination";

export class EventSearchDto extends PaginationDto implements IEventSearchDto {
  @ApiProperty({
    type: String,
  })
  @IsString({ message: "typeMismatch" })
  @IsEthereumAddress({ message: "patternMismatch" })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  public address: string;
}
