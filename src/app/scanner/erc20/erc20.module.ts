import { Module } from "@nestjs/common";

import { Erc20TokenModule } from "./token/token.module";

@Module({
  imports: [Erc20TokenModule],
})
export class Erc20Module {}
