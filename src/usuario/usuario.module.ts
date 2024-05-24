import { Module } from "@nestjs/common";
import { UsuarioController } from "src/usuario.controller";

@Module({
    controllers: [UsuarioController]
})
export class UsuarioModule {}