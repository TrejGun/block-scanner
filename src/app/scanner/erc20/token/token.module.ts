import { Module, OnModuleInit } from "@nestjs/common";

import { EthersModule, EthersService } from "@ethberry/nestjs-ethers";

import { ContractType, Erc20ABI, Erc20EventSignature } from "./interfaces";
import { Erc20TokenControllerEth } from "./token.controller.eth";
import { Erc20TokenServiceEth } from "./token.service.eth";
import { EventModule } from "../../../event/event.module";

@Module({
  imports: [EventModule, EthersModule.deferred()],
  providers: [Erc20TokenServiceEth],
  controllers: [Erc20TokenControllerEth],
  exports: [Erc20TokenServiceEth],
})
export class Erc20TokenModule implements OnModuleInit {
  constructor(private readonly ethersService: EthersService) {}

  public onModuleInit(): void {
    return this.ethersService.updateRegistry({
      contractType: ContractType.ERC20_TOKEN,
      contractAddress: [
        "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
      ],
      contractInterface: Erc20ABI,
      eventSignatures: [
        Erc20EventSignature.Approval,
        Erc20EventSignature.Transfer,
      ],
    });
  }
}
