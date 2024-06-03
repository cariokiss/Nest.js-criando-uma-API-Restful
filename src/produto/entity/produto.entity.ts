import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'produtos' })
export class ProdutoEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', length: 100, nullable: false})
  usuarioId: string;
  
  @Column({ name: 'nome', length: 100, nullable: false})
  nome: string;

  @Column({ name: 'valor', nullable: false})
  valor: number;
  
  @Column({ name: 'quantidade_disponivel', nullable: false})
  quantidadeDisponivel: number;

  @Column({ name: 'descricao', length: 255, nullable: false})
  descricao: string;

  @Column({ name: 'categoria', length: 100, nullable: false})
  categoria: string;
  
  // caracteristicas: CaracteristicaProduto[];
  // imagens: ImagemProduto[];
}
