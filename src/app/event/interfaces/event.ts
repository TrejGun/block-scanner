import { TErc20Events } from "./erc20";

export interface IEvent {
  id: number;
  blockNumber: number;
  transactionHash: string;
  address: string;
  name: string;
  eventData: TErc20Events;
}
