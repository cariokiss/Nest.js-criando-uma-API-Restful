import { Module } from "@nestjs/common";
import { ProdutoController } from "src/produto/produto.controller";
import { ProdutoRepository } from "src/produto/produto.repository";

@Module({
    controllers: [ProdutoController],
    providers: [ProdutoRepository]
})
export class ProdutoModule {}