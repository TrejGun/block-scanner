export interface IErc20TokenTransferEvent {
  from: string;
  to: string;
  value: string;
}

export interface IErc20TokenApproveEvent {
  owner: string;
  spender: string;
  value: string;
}

export type TErc20Events = IErc20TokenTransferEvent | IErc20TokenApproveEvent;
