export interface IErc721TokenTransferEvent {
  from: string;
  to: string;
  tokenId: string;
}

export interface IErc721TokenApproveEvent {
  owner: string;
  approved: string;
  tokenId: string;
}

export type TErc721Events =
  | IErc721TokenTransferEvent
  | IErc721TokenApproveEvent;
