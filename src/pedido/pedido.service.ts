import { Injectable } from '@nestjs/common';
import { CriaPedidoDto } from './dto/criaPedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './entity/pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '.././usuario/entity/usuario.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { ItemPedidoEntity } from './entity/itemPedido.entity';
import { ProdutoEntity } from '.././produto/entity/produto.entity';

@Injectable()
export class PedidoService {
  constructor (
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>
  ) {}

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDto) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId})
    const produtosIds = dadosDoPedido.itensPedido.map((itemPedido) => itemPedido.produtoId)

    const produtosRelacionados = await this.produtoRepository.findBy({id:In(produtosIds)})
    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId)
      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;
      return itemPedidoEntity;
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
