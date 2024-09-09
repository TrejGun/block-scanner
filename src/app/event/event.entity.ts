import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { ns } from "../../common/constants";
import type { IEvent, TErc20Events } from "./interfaces";

@Entity({ schema: ns, name: "events" })
export class EventEntity extends BaseEntity implements IEvent {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "integer" })
  public blockNumber: number;

  @Column({ type: "varchar" })
  public transactionHash: string;

  @Column({ type: "varchar" })
  public address: string;

  @Column({ type: "varchar" })
  public name: string;

  @Column({ type: "json" })
  public eventData: TErc20Events;
}
