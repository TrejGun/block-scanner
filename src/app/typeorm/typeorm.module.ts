import { Module, DynamicModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

@Module({})
export class GemunionTypeormModule {
  static forRoot(options: PostgresConnectionOptions): DynamicModule {
    return TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...options,
          url: configService.get<string>(
            "POSTGRES_URL",
            "postgres://postgres:password@127.0.0.1/postgres",
          ),
          keepConnectionAlive:
            configService.get<string>("NODE_ENV", "development") === "test",
        };
      },
    });
  }
}
