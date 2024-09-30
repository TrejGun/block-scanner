import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { Log } from "ethers";

import type { ILogEvent } from "@ethberry/nestjs-ethers";

import { ContractType, Erc20EventTypes } from "./interfaces";
import type {
  IErc20TokenApproveEvent,
  IErc20TokenTransferEvent,
} from "./interfaces";
import { Erc20TokenServiceEth } from "./token.service.eth";
import { EventEntity } from "../../../event/event.entity";

@Controller()
export class Erc20TokenControllerEth {
  constructor(private readonly erc20TokenServiceEth: Erc20TokenServiceEth) {}

  @EventPattern({
    contractType: ContractType.ERC20_TOKEN,
    eventName: Erc20EventTypes.Transfer,
  })
  public transfer(
    @Payload() event: ILogEvent<IErc20TokenTransferEvent>,
    @Ctx() context: Log,
  ): Promise<EventEntity> {
    return this.erc20TokenServiceEth.transfer(event, context);
  }

  @EventPattern({
    contractType: ContractType.ERC20_TOKEN,
    eventName: Erc20EventTypes.Approval,
  })
  public approval(
    @Payload() event: ILogEvent<IErc20TokenApproveEvent>,
    @Ctx() context: Log,
  ): Promise<EventEntity> {
    return this.erc20TokenServiceEth.approval(event, context);
  }
}
