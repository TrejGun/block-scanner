import { APP_PIPE } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CronExpression } from "@nestjs/schedule";

import { EthersModule } from "@ethberry/nestjs-ethers";
import type { IModuleOptions } from "@ethberry/nestjs-ethers";

import ormconfig from "../ormconfig";
import { EventModule } from "./event/event.module";
import { ScannerModule } from "./scanner/scanner.module";
import { AppController } from "./app.controller";
import { HttpValidationPipe } from "../utils/http.validation";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...ormconfig,
          url: configService.get<string>(
            "POSTGRES_URL",
            "postgres://postgres:password@127.0.0.1/postgres",
          ),
          keepConnectionAlive:
            configService.get<string>("NODE_ENV", "development") === "test",
        };
      },
    }),
    EthersModule.forRootAsync(EthersModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<IModuleOptions> => {
        const latency = ~~configService.get<string>("LATENCY", "32");
        const fromBlock = ~~configService.get<string>("STARTING_BLOCK", "0");
        const cronSchedule = configService.get<string>(
          "CRON_SCHEDULE",
          CronExpression.EVERY_30_SECONDS,
        );
        return Promise.resolve({
          latency,
          fromBlock,
          debug: true,
          cron: Object.values(CronExpression)[
            Object.keys(CronExpression).indexOf(cronSchedule)
          ],
        });
      },
    }),
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
