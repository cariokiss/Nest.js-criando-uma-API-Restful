import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "src/usuario/usuario.repository";
import { CriaUsuarioDto } from "./dto/criaUsuario.dto";
import { UsuarioEntity } from "./entity/usuario.entity";
import { v4 as uuid} from "uuid";
import { listaUsuarioDto } from "./dto/listaUsuario.dto";
import { AtualizaUsuarioDto } from "./dto/atualizaUsuario.dto";

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
        return { 
            usuario: new listaUsuarioDto(usuarioEntity.id, usuarioEntity.nome),
            messagem: "usuário criado com sucesso"};
    }
    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map (
            usuario => new listaUsuarioDto(
                usuario.id,
                usuario.nome,
            )
        );
        return usuariosLista
    }
    
    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDto) {
    const usuarioAtualizado = await this.usuarioRepository.atualizaUsuario(id, novosDados);

    return {
        usuario: usuarioAtualizado,
        mensagem: 'usuário atualizado com sucesso',
    }
}
}