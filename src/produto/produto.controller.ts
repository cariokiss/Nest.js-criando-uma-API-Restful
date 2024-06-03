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
  
  @Controller('produtos')
  export class ProdutoController {
    constructor(private readonly produtoRepository: ProdutoRepository) {}
  
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
    const produtoCriado = await this.produtoRepository.salva(produto);
    return produtoCriado;
  }
  
    @Get()
    async listaTodos() {
      return this.produtoRepository.listaTodos();
    }
  
    @Put('/:id')
    async atualiza(
      @Param('id') id: string,
      @Body() dadosProduto: AtualizaProdutoDTO,
    ) {
      const produtoAlterado = await this.produtoRepository.atualiza(
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
      const produtoRemovido = await this.produtoRepository.remove(id);
  
      return {
        mensagem: 'produto removido com sucesso',
        produto: produtoRemovido,
      };
    }
  }
  