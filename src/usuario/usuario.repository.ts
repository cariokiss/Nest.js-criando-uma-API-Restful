import { Injectable } from "@nestjs/common";

@Injectable() // transforma a classe em um provider
export class UsuarioRepository{
    private usuarios = []; // cria uma variável privada

    async salvar(usuario) { // método para salvar um usuário
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
}