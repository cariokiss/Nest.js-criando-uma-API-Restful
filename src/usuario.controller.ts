import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";

@Controller('/usuarios')
export class UsuarioController {

    private usuarioRepository = new UsuarioRepository(); // cria um atributo e instância o repositório UsuarioRepository

    @Post()
    async criaUsuario(@Body()dadosDoUsuario) { // cria um usuário e pega os dados do corpo da requisição (body)
            this.usuarioRepository.salvar(dadosDoUsuario) // salva o usuário criado na memória e passa o dadosDoUsuario como parâmetro
            return dadosDoUsuario; // retorna o corpo da requisição (usuário criado)
    }
    @Get()
    async listaUsuarios() {
        return this.usuarioRepository.listar();
    }
}