import { Module } from "@nestjs/common";

import { Erc721TokenModule } from "./token/token.module";

@Module({
  imports: [Erc721TokenModule],
})
export class Erc721Module {}
