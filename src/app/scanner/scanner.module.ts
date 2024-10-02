import { Module } from "@nestjs/common";

import { Erc20Module } from "./erc20/erc20.module";
import { Erc721Module } from "./erc721/erc721.module";

@Module({
  imports: [Erc20Module, Erc721Module],
})
export class ScannerModule {}
