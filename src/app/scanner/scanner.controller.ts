import { Body, Controller, Post, Get } from "@nestjs/common";

import { ScannerService } from "./scanner.service";
import { ScanBlocksDto } from "./dto";

@Controller("/scanner")
export class ScannerController {
  constructor(private readonly scannerService: ScannerService) {}

  @Post("/scan")
  public scan(@Body() dto: ScanBlocksDto): Promise<void> {
    return this.scannerService.scan(dto);
  }

  @Get("/block-number")
  public getBlockNumber(): Promise<number> {
    return this.scannerService.getBlockNumber();
  }
}
