import { Module } from '@nestjs/common';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
})
export class AppModule {}
