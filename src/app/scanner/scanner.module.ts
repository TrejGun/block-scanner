import { Module, Logger } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EventModule } from "../event/event.module";
import { ethersRpcProvider } from "../ethers/providers/rpc";
import { ScannerService } from "./scanner.service";
import { ScannerController } from "./scanner.controller";

@Module({
  imports: [ConfigModule, EventModule],
  providers: [ethersRpcProvider, Logger, ScannerService],
  controllers: [ScannerController],
  exports: [ScannerService],
})
export class ScannerModule {}
