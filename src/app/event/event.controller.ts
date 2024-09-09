import { Body, Controller, Post } from "@nestjs/common";

import { EventSearchDto, EventJsonDto } from "./dto";
import { EventService } from "./event.service";
import { EventEntity } from "./event.entity";

@Controller("/events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post("/search")
  public search(@Body() dto: EventSearchDto): Promise<Array<EventEntity>> {
    return this.eventService.search(dto);
  }

  @Post("/json")
  public json(@Body() dto: EventJsonDto): Promise<Array<EventEntity>> {
    return this.eventService.json(dto);
  }
}
