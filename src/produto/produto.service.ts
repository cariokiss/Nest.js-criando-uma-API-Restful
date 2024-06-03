import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./entity/produto.entity";
import { Repository } from "typeorm";
import { ListaProdutoDTO } from "./dto/listaProduto.dto";
import { AtualizaProdutoDTO } from "./dto/atualizaProduto.dto";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) {}

    async criaProduto(produtoEntity: ProdutoEntity) {
        await this.produtoRepository.save(produtoEntity);
    }

    async listaProdutos() {
        const produtosSalvos = await this.produtoRepository.find();
        return produtosSalvos;
    }

    async atualizaProdutos(id: string, produto: AtualizaProdutoDTO) {
        await this.produtoRepository.update(id, produto)
    }

    async deletaProdutos(id: string) {
        await this.produtoRepository.delete(id)
    }    
}