import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "src/usuario/usuario.repository";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}

    @Post()
    async criaUsuario(@Body() dadosDoUsuario) { // cria um usuário e pega os dados do corpo da requisição (body)
            this.usuarioRepository.salvar(dadosDoUsuario) // salva o usuário criado na memória e passa o dadosDoUsuario como parâmetro
            return dadosDoUsuario; // retorna o corpo da requisição (usuário criado)
    }
    @Get()
    async listaUsuarios() {
        return this.usuarioRepository.listar();
    }
}