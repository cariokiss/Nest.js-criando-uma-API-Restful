import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    Param,
    Post,
    Put,
    Req,
  } from '@nestjs/common';
  import { randomUUID } from 'crypto';
  
  import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
  import { CriaProdutoDTO } from './dto/CriaProduto.dto';
  import { ProdutoEntity } from './entity/produto.entity';
  import { ProdutoRepository } from './produto.repository';
import { ProdutoService } from './produto.service';
  
  @Controller('produtos')
  export class ProdutoController {
    constructor(
      private readonly produtoRepository: ProdutoRepository,
      private readonly produtoService: ProdutoService
    ) {}
  
    @Post(':usuarioId')
    async criaNovo(@Body() dadosProduto: CriaProdutoDTO, @Param('usuarioId') usuarioId: string) {
    const produto = new ProdutoEntity();

    produto.id = randomUUID();
    produto.nome = dadosProduto.nome;
    produto.usuarioId = usuarioId; // Use o usuárioId recebido dos parâmetros de rota
    produto.valor = dadosProduto.valor;
    produto.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
    produto.descricao = dadosProduto.descricao;
    produto.categoria = dadosProduto.categoria;
    // produto.caracteristicas = dadosProduto.caracteristicas;
    // produto.imagens = dadosProduto.imagens;

    // Aguarde a resposta do método salva para obter o produto criado
    this.produtoService.criaProduto(produto);
    return produto;
  }
  
    @Get()
    async listaTodos() {
      return this.produtoService.listaProdutos();
    }
  
    @Put('/:id')
    async atualiza(
      @Param('id') id: string,
      @Body() dadosProduto: AtualizaProdutoDTO,
    ) {
      const produtoAlterado = await this.produtoService.atualizaProdutos(
        id,
        dadosProduto,
      );
  
      return {
        mensagem: 'produto atualizado com sucesso',
        produto: produtoAlterado,
      };
    }
  
    @Delete('/:id')
    async remove(@Param('id') id: string) {
      const produtoRemovido = await this.produtoService.deletaProdutos(id);
  
      return {
        mensagem: 'produto removido com sucesso',
        produto: produtoRemovido,
      };
    }
  }
  