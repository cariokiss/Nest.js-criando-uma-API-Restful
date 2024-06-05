import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionaPedidoEItemPeido1717592091179 implements MigrationInterface {
    name = 'RelacionaPedidoEItemPeido1717592091179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "itens_pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL, "preco_venda" integer NOT NULL, "pedidosId" uuid, CONSTRAINT "PK_d93e780d333fe5d91e43797e8b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_e0a8ba5ad0d2204ad7f12ebdd31" FOREIGN KEY ("pedidosId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_e0a8ba5ad0d2204ad7f12ebdd31"`);
        await queryRunner.query(`DROP TABLE "itens_pedidos"`);
    }

}
