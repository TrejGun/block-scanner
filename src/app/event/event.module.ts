import { Module, Logger } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ethersRpcProvider } from "../ethers/providers/rpc";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { EventEntity } from "./event.entity";

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([EventEntity])],
  providers: [ethersRpcProvider, Logger, EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}