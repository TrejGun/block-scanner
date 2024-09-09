import { ApiProperty } from "@nestjs/swagger";
import {
  IsEthereumAddress,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";

import { IScanBlocksDto } from "../interfaces";

// https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7
export class ScanBlocksDto implements IScanBlocksDto {
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
