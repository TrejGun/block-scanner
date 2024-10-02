import { Injectable } from "@nestjs/common";
import { Log } from "ethers";

import type { ILogEvent } from "@ethberry/nestjs-ethers";

import { EventService } from "../../../event/event.service";
import { EventEntity } from "../../../event/event.entity";
import type {
  IErc721TokenApproveEvent,
  IErc721TokenTransferEvent,
} from "./interfaces";

@Injectable()
export class Erc721TokenServiceEth {
  constructor(private readonly eventService: EventService) {}

  public async transfer(
    event: ILogEvent<IErc721TokenTransferEvent>,
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
    event: ILogEvent<IErc721TokenApproveEvent>,
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
