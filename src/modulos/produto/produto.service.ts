import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './entity/produto.entity';
import { Repository } from 'typeorm';
import { ListaProdutoDTO } from './dto/listaProduto.dto';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ListaUsuarioDto } from '../usuario/dto/listaUsuario.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(dadosProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();

    // <ProdutoEntity>dadosProduto === dadosProduto as ProdutoEntity
    Object.assign(produtoEntity, dadosProduto as ProdutoEntity);

    return this.produtoRepository.save(produtoEntity);
  }

  async listaProdutos() {
    const produtosSalvos = await this.produtoRepository.find({
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });
    const produtosLista = produtosSalvos.map(
      (produto) =>
        new ListaProdutoDTO(
          produto.id,
          produto.nome,
          produto.caracteristicas,
          produto.imagens,
        ),
    );
    return produtosLista;
  }

  async listaUm(id: string) {
      const produtosPorUsuario = await this.produtoRepository.findOneBy({id})

      if (produtosPorUsuario === null) {
        throw new NotFoundException('O produto não foi encontrado!');
      }

      return produtosPorUsuario;
  }

  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    const entityName = await this.produtoRepository.findOneBy({ id });

    if (entityName === null) {
      throw new NotFoundException('O produto não foi encontrado!');
    }

    Object.assign(entityName, novosDados as ProdutoEntity);

    return this.produtoRepository.save(entityName);
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.delete(id);
  }
}
