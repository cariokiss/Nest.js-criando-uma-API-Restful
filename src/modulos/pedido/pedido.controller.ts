import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDto } from './dto/criaPedido.dto';
import { AtualizaPedidoDto } from './dto/atualizaPedido.dto';
import { AutenticacaoGuard, RequisicaoComUsuario } from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Req() req: RequisicaoComUsuario,
    @Body() dadosDoPedido: CriaPedidoDto,
  ) {
    const usuarioId = req.usuario.sub
    const pedidoCriado = await this.pedidoService.cadastraPedido(
      usuarioId,
      dadosDoPedido,
    );
    return pedidoCriado;
  }

  @Get()
  async obtemPedidos(@Req() req: RequisicaoComUsuario
  ) {
    const usuarioId= req.usuario.sub
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
