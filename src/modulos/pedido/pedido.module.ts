import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './entity/pedido.entity';
import { UsuarioEntity } from '../usuario/entity/usuario.entity';
import { ProdutoEntity } from '../produto/entity/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity, ProdutoEntity]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
