import { Injectable } from "@nestjs/common";
import { Log } from "ethers";

import type { ILogEvent } from "@ethberry/nestjs-ethers";

import type {
  IErc20TokenApproveEvent,
  IErc20TokenTransferEvent,
} from "./interfaces";
import { EventService } from "../../../event/event.service";
import { EventEntity } from "../../../event/event.entity";

@Injectable()
export class Erc20TokenServiceEth {
  constructor(private readonly eventService: EventService) {}

  public async transfer(
    event: ILogEvent<IErc20TokenTransferEvent>,
    context: Log,
  ): Promise<EventEntity> {
    return this.eventService.create({
      blockNumber: context.blockNumber,
      transactionHash: context.transactionHash,
      address: context.address,
      name: event.name,
      eventData: event.args,
    });
  }

  public async approval(
    event: ILogEvent<IErc20TokenApproveEvent>,
    context: Log,
  ): Promise<EventEntity> {
    return this.eventService.create({
      blockNumber: context.blockNumber,
      transactionHash: context.transactionHash,
      address: context.address,
      name: event.name,
      eventData: event.args,
    });
  }
}
