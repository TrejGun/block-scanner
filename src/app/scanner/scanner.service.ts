import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { Interface, JsonRpcProvider } from "ethers";
import { Log } from "@ethersproject/abstract-provider";

import { abi } from "../../utils/ERC20Ownable.json";
import { ETHERS_RPC } from "../ethers/ethers.constants";
import { recursivelyDecodeResult } from "../ethers/ethers.utils";
import { EventService } from "../event/event.service";
import type { IEvent, TErc20Events } from "../event/interfaces";
import type { IScanBlocksDto } from "./interfaces";

@Injectable()
export class ScannerService {
  constructor(
    @Inject(Logger)
    protected readonly loggerService: LoggerService,
    @Inject(ETHERS_RPC)
    protected readonly provider: JsonRpcProvider,
    protected readonly eventService: EventService,
  ) {}

  public async getBlockNumber(): Promise<number> {
    return this.provider.getBlockNumber();
  }

  public async scan(dto: IScanBlocksDto): Promise<void> {
    const logs = await this.getPastEvents(dto);
    const data = this.parseLogs(logs);
    for (const event of data) {
      await this.eventService.create(event);
    }
  }

  public async getPastEvents(dto: IScanBlocksDto): Promise<Array<Log>> {
    const { address, fromBlock, toBlock } = dto;
    return this.provider.send("eth_getLogs", [
      {
        address,
        fromBlock: `0x${fromBlock.toString(16)}`,
        toBlock: `0x${toBlock.toString(16)}`,
      },
    ]) as unknown as Promise<Array<Log>>;
  }

  public parseLogs(logs: Array<Log>): Array<Partial<IEvent>> {
    const iFace = new Interface(abi);
    return logs.reduce<Array<Partial<IEvent>>>((memo, current) => {
      const description = iFace.parseLog(current);
      if (description === null) {
        this.loggerService.log(
          `Failed to parse:\n${JSON.stringify(current, null, "\t")}`,
          ScannerService.name,
        );
        return memo;
      }
      return memo.concat({
        blockNumber: Number(current.blockNumber),
        transactionHash: current.transactionHash,
        address: current.address.toLowerCase(),
        name: description.name,
        eventData: recursivelyDecodeResult(description.args) as TErc20Events,
      });
    }, []);
  }
}
