import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

import { IEventSearchDto } from "./interfaces";
import { EventEntity } from "./event.entity";
import { EventJsonDto } from "./dto";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventEntityRepository: Repository<EventEntity>,
  ) {}

  public async search(dto: IEventSearchDto): Promise<Array<EventEntity>> {
    const { address, skip, take } = dto;

    const queryBuilder = this.eventEntityRepository.createQueryBuilder("event");

    queryBuilder.select();

    queryBuilder.andWhere("event.address = :address", {
      address,
    });

    queryBuilder.skip(skip);
    queryBuilder.take(take);

    return queryBuilder.getMany();
  }

  public async json(dto: EventJsonDto): Promise<Array<EventEntity>> {
    const { key, value } = dto;

    const queryBuilder =
      this.eventEntityRepository.createQueryBuilder("history");

    queryBuilder.select();

    queryBuilder.andWhere(`history.event_data->>'${key}' = :${key}`, {
      [key]: value,
    });

    return queryBuilder.getMany();
  }

  public async create(dto: DeepPartial<EventEntity>): Promise<EventEntity> {
    return this.eventEntityRepository.create(dto).save();
  }
}
