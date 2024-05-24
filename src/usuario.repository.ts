export class UsuarioRepository{
    private usuarios = []; // cria uma variável privada

    async salvar(usuario) { // método para salvar um usuário
        this.usuarios.push(usuario); // pega o usuário e salva
        console.log(this.usuarios); // mostra que os usuarios estão sendo salvos na memória
    }
}