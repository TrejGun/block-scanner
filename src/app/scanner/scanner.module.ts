import { Module } from "@nestjs/common";

import { Erc20Module } from "./erc20/erc20.module";

@Module({
  imports: [Erc20Module],
})
export class ScannerModule {}
