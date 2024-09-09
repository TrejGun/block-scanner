import { ApiProperty } from "@nestjs/swagger";
import {
  IsEthereumAddress,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";

import { IEventSearchDto } from "../interfaces";

export class EventSearchDto implements IEventSearchDto {
  @ApiProperty({
    type: String,
  })
  @IsString({ message: "typeMismatch" })
  @IsEthereumAddress({ message: "patternMismatch" })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  public address: string;

  @ApiProperty({
    minimum: 1,
  })
  @IsOptional()
  @IsInt({ message: "typeMismatch" })
  public fromBlock: number;

  @ApiProperty({
    minimum: 1,
  })
  @IsOptional()
  @IsInt({ message: "typeMismatch" })
  public toBlock: number;
}
