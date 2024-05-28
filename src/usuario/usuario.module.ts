import { Module } from "@nestjs/common";
import { UsuarioController } from "src/usuario/usuario.controller";
import { UsuarioRepository } from "src/usuario/usuario.repository";
import { EmailEUnicoValidator } from "./validacao/email-e-unico.validator";

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioRepository, EmailEUnicoValidator]
})
export class UsuarioModule {}