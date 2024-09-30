import { IPaginationDto } from "./pagination";

export interface IEventSearchDto extends IPaginationDto {
  address: string;
}
