import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "src/produto/produto.repository";

@Controller('/produtos')
export class ProdutoController {

    constructor(private produtoRepository: ProdutoRepository) {}

    @Post()
    async criaProduto(@Body() dadosDoProduto) { // cria um usuário e pega os dados do corpo da requisição (body)
            this.produtoRepository.salvar(dadosDoProduto) // salva o usuário criado na memória e passa o dadosDoProduto como parâmetro
            return dadosDoProduto; // retorna o corpo da requisição (usuário criado)
    }
    @Get()
    async listaProdutos() {
        return this.produtoRepository.listar();
    }
}