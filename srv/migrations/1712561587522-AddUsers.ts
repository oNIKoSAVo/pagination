import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsers1712561587522 implements MigrationInterface {
    name = 'AddUsers1712561587522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" BIGSERIAL NOT NULL,
                "firstname" character varying(255),
                "lastname" character varying(255),
                "phone" character varying(16),
                "email" character varying(320) NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "pk_users_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
