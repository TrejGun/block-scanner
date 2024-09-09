import { MigrationInterface, QueryRunner, Table } from "typeorm";

import { ns } from "../common/constants";

export class CreateEvents1694684323777 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: `${ns}.events`,
      columns: [
        {
          name: "id",
          type: "bigserial",
          isPrimary: true,
        },
        {
          name: "block_number",
          type: "int",
        },
        {
          name: "transaction_hash",
          type: "varchar",
        },
        {
          name: "address",
          type: "varchar",
        },
        {
          name: "name",
          type: "varchar",
        },
        {
          name: "event_data",
          type: "json",
        },
      ],
    });

    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(`${ns}.events`);
  }
}
