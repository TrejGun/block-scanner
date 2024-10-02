import { Module, OnModuleInit } from "@nestjs/common";

import { EthersModule, EthersService } from "@ethberry/nestjs-ethers";

import { EventModule } from "../../../event/event.module";
import { ContractType } from "../../erc20/interface";
import { Erc721ABI, Erc721EventSignature } from "./interfaces";
import { Erc721TokenControllerEth } from "./token.controller.eth";
import { Erc721TokenServiceEth } from "./token.service.eth";

@Module({
  imports: [EventModule, EthersModule.deferred()],
  providers: [Erc721TokenServiceEth],
  controllers: [Erc721TokenControllerEth],
  exports: [Erc721TokenServiceEth],
})
export class Erc721TokenModule implements OnModuleInit {
  constructor(private readonly ethersService: EthersService) {}

  public onModuleInit(): void {
    return this.ethersService.updateRegistry({
      contractType: ContractType.ERC721_TOKEN,
      contractAddress: [
        "0x51bb4c8bb4901d6aa061282cd7ed916eec715a29", // EGG
      ],
      contractInterface: Erc721ABI,
      eventSignatures: [
        Erc721EventSignature.Approval,
        Erc721EventSignature.Transfer,
      ],
    });
  }
}
