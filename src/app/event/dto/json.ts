import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

import { IEventJsonDto } from "../interfaces";

export class EventJsonDto implements IEventJsonDto {
  @ApiProperty()
  @IsInt({ message: "typeMismatch" })
  public key: string;

  @ApiProperty()
  @IsInt({ message: "typeMismatch" })
  public value: string;
}
