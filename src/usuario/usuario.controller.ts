import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "src/usuario/usuario.repository";
import { CriaUsuarioDto } from "./dto/criaUsuario.dto";
import { UsuarioEntity } from "./entity/usuario.entity";
import { v4 as uuid} from "uuid";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}

    @Post()
    // cria um usuário e pega os dados do corpo da requisição (body)
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) { 
        // recebe os dados do UsuarioEntity e gera um uuid
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.id = uuid();

        // salva o usuário criado na memória e passa o usuarioEntity como parâmetro
        this.usuarioRepository.salvar(usuarioEntity)
        // retorna o corpo da requisição (uuid do usuário + messagem de sucesso)
        return { id: usuarioEntity.id, message: "usuário criado com sucesso"};
    }
    @Get()
    async listaUsuarios() {
        return this.usuarioRepository.listar();
    }
}