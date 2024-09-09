import { APP_PIPE } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import ormconfig from "../ormconfig";
import { GemunionTypeormModule } from "./typeorm/typeorm.module";
import { EventModule } from "./event/event.module";
import { ScannerModule } from "./scanner/scanner.module";
import { AppController } from "./app.controller";
import { HttpValidationPipe } from "./http.validation";

@Module({
  imports: [
    ConfigModule.forRoot(),
    GemunionTypeormModule.forRoot(ormconfig),
    EventModule,
    ScannerModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: HttpValidationPipe,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
