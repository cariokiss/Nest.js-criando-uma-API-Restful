import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./entity/usuario.entity";

@Injectable() // transforma a classe em um provider
export class UsuarioRepository{
    private usuarios: UsuarioEntity[] = []; // cria uma variável privada

    async salvar(usuario: UsuarioEntity) { // método para salvar um usuário
        this.usuarios.push(usuario); // pega o usuário e salva
    }

    async listar() { // método para listar os usuários
        return(this.usuarios); // pega os usuários criados e lista
    }
    async existeComEmail(email: string) {
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );
        return possivelUsuario !== undefined
    }

    async atualizaUsuario(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        );

        if(!possivelUsuario) {
            throw new Error('Usuário não existe')
        }

        Object.entries(dadosDeAtualizacao).forEach (([chave, valor]) => {
            if (chave === 'id') {
                return;
            }

            possivelUsuario[chave] = valor;
        });

        return possivelUsuario;
    }
}