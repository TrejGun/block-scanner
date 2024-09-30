import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";
import { IPaginationDto } from "../interfaces";

export class PaginationDto implements IPaginationDto {
  @ApiPropertyOptional({
    type: Number,
    default: 0,
    minimum: 0,
  })
  @IsOptional()
  @IsInt({ message: "typeMismatch" })
  @Min(0, { message: "rangeUnderflow" })
  @Type(() => Number)
  public skip = 0;

  @ApiPropertyOptional({
    type: Number,
    minimum: 1,
    default: 25,
  })
  @IsOptional()
  @IsInt({ message: "typeMismatch" })
  @Min(0, { message: "rangeUnderflow" })
  @Type(() => Number)
  public take = 25;
}
