import { Injectable } from '@nestjs/common';
import { CriaPedidoDto } from './dto/criaPedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './entity/pedido.entity';
import { Repository } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { ItemPedidoEntity } from './entity/itemPedido.entity';

@Injectable()
export class PedidoService {
  constructor (
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ) {}

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDto) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId})
    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.precoVenda = 10;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      return itemPedidoEntity
    })

    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade
    }, 0)

    pedidoEntity.itensPedido = itensPedidoEntidades

    pedidoEntity.valorTotal = valorTotal

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity)
    return pedidoCriado;
  }

  async listaPedidos(usuarioId: string) {
    const pedidosSalvos = await this.pedidoRepository.find({
      where: {
        usuario: {id: usuarioId}
      },
      relations: {usuario: true},
    });
    return pedidosSalvos;
  }
}
