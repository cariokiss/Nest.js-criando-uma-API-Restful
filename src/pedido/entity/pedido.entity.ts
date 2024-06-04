import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { StatusPedido } from '../enum/status-pedido.enum';
import { UsuarioEntity } from '../../usuario/entity/usuario.entity';

@Entity({ name: 'pedidos'})
export class PedidoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'valor_total', nullable: false})
    valorTotal: number;
    
    @Column({ name: 'status', enum: StatusPedido, nullable: false})
    status: StatusPedido;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({ name: 'update_at'})
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at'})
    deletedAt: string;

    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pedidos)
    usuario: UsuarioEntity;
}