import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDto } from './dto/criaPedido.dto';
import { AtualizaPedidoDto } from './dto/atualizaPedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: CriaPedidoDto,
  ) {
    const pedidoCriado = await this.pedidoService.cadastraPedido(usuarioId, dadosDoPedido)
    return pedidoCriado;
  }

  @Get()
  async obtemPedidos(@Query('usuarioId') usuarioId: string) {
    const pedidos = await this.pedidoService.listaPedidos(usuarioId);

    return pedidos;
  }

  @Patch(':id')
  async atualizaStatusPedido(
    @Param('id') pedidoId: string,
    @Body() dadosDeAtualizacao: AtualizaPedidoDto,
  ) {
    return this.pedidoService.atualizaPedido(pedidoId, dadosDeAtualizacao);
  }
}
