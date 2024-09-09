import { MigrationInterface, QueryRunner } from "typeorm";

export function createSchema(ns: string) {
  return class CreateSchema1561991000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createSchema(ns, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropSchema(ns);
    }
  };
}
