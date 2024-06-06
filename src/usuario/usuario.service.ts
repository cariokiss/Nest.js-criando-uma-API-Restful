import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entity/usuario.entity';
import { Repository } from 'typeorm';
import { ListaUsuarioDto } from './dto/listaUsuario.dto';
import { AtualizaUsuarioDto } from './dto/atualizaUsuario.dto';
import { CriaUsuarioDto } from './dto/criaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(dadosDoUsuario: CriaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();

    Object.assign(usuarioEntity, dadosDoUsuario as UsuarioEntity);

    return this.usuarioRepository.save(usuarioEntity);
  }

  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDto(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDto) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null)
      throw new NotFoundException('O usuário não foi encontrado.');

    Object.assign(usuario, novosDados as UsuarioEntity);

    return this.usuarioRepository.save(usuario);
  }

  async deletaUsuario(id: string) {
    const resultado = await this.usuarioRepository.delete(id);

    if (!resultado.affected)
      throw new NotFoundException('O usuário não foi encontrado.');
  }
}
