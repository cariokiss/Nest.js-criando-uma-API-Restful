import { Injectable } from "@nestjs/common";

@Injectable() // transforma a classe em um provider
export class ProdutoRepository{
    private produtos = []; // cria uma variável privada

    async salvar(produto) { // método para salvar um usuário
        this.produtos.push(produto); // pega o usuário e salva
    }

    async listar() { // método para listar os usuários
        return(this.produtos); // pega os usuários criados e lista
    }
}