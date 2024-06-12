import { Module } from '@nestjs/common';
import { UsuarioController } from '../usuario/usuario.controller';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { EmailEUnicoValidator } from './validacao/email-e-unico.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entity/usuario.entity';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository, EmailEUnicoValidator],
})
export class UsuarioModule {}
