import { Module } from "@nestjs/common";
import { UsuarioController } from "src/usuario/usuario.controller";
import { UsuarioRepository } from "src/usuario/usuario.repository";

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioRepository]
})
export class UsuarioModule {}