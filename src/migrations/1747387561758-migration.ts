import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1747387561758 implements MigrationInterface {
    name = 'Migration1747387561758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."subscription_frequency_enum" AS ENUM('hourly', 'daily')`);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "city" character varying NOT NULL, "frequency" "public"."subscription_frequency_enum" NOT NULL, "token" character varying NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "subscriptionId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_f1d3ffb910b5c1a9052df7c183" UNIQUE ("subscriptionId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f1d3ffb910b5c1a9052df7c1833" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f1d3ffb910b5c1a9052df7c1833"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP TYPE "public"."subscription_frequency_enum"`);
    }

}
