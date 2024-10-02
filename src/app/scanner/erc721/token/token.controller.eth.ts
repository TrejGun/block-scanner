import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { Log } from "ethers";

import type { ILogEvent } from "@ethberry/nestjs-ethers";

import { EventEntity } from "../../../event/event.entity";
import { ContractType } from "../../erc20/interface";
import type {
  IErc721TokenApproveEvent,
  IErc721TokenTransferEvent,
} from "./interfaces";
import { Erc721EventTypes } from "./interfaces";
import { Erc721TokenServiceEth } from "./token.service.eth";

@Controller()
export class Erc721TokenControllerEth {
  constructor(private readonly erc721TokenServiceEth: Erc721TokenServiceEth) {}

  @EventPattern({
    contractType: ContractType.ERC721_TOKEN,
    eventName: Erc721EventTypes.Transfer,
  })
  public transfer(
    @Payload() event: ILogEvent<IErc721TokenTransferEvent>,
    @Ctx() context: Log,
  ): Promise<EventEntity> {
    return this.erc721TokenServiceEth.transfer(event, context);
  }

  @EventPattern({
    contractType: ContractType.ERC721_TOKEN,
    eventName: Erc721EventTypes.Approval,
  })
  public approval(
    @Payload() event: ILogEvent<IErc721TokenApproveEvent>,
    @Ctx() context: Log,
  ): Promise<EventEntity> {
    return this.erc721TokenServiceEth.approval(event, context);
  }
}
