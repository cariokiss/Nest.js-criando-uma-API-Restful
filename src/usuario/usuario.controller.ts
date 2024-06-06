import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaUsuarioDto } from './dto/criaUsuario.dto';
import { ListaUsuarioDto } from './dto/listaUsuario.dto';
import { AtualizaUsuarioDto } from './dto/atualizaUsuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {
    const usuarioCriado = await this.usuarioService.criaUsuario(dadosDoUsuario);

    return {
      usuario: new ListaUsuarioDto(usuarioCriado.id, usuarioCriado.nome),
      messagem: 'usuário criado com sucesso',
    };
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioService.listUsuarios();

    return usuariosSalvos;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDto,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      novosDados,
    );

    return {
      usuario: usuarioAtualizado,
      messagem: 'usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

    return {
      usuario: usuarioRemovido,
      messagem: 'usuário removido com suceso',
    };
  }
}
