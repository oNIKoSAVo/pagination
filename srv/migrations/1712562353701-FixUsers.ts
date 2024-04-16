import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUsers1712562353701 implements MigrationInterface {
    name = 'FixUsers1712562353701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_a000cca60bcf04454e727699490"
        `);
    }

}
