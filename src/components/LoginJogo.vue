<template>
  <section id="login" class="d-flex flex-column gap-3">
    <!-- Tela de Login -->
    <div v-if="telaAtual === 'login'" class="login-container">
      <h1 class="text-center">Login</h1>

      <div class="form-group">
        <label>Usuário:</label>
        <input
          type="text"
          class="form-control"
          v-model="usuario"
          placeholder="Digite seu usuário"
        />
      </div>

      <div class="form-group">
        <label>Senha:</label>
        <input
          type="password"
          class="form-control"
          v-model="senha"
          placeholder="Digite sua senha"
        />
      </div>

      <button class="teclado-button btn btn-primary w-100" v-on:click="logar">
        Logar
      </button>

      <p v-if="erroMensagem" class="text-danger text-center mt-2">
        {{ erroMensagem }}
      </p>

      <div class="cadastro-link">
        <span>Não tem uma conta?</span>
        <a href="#" v-on:click.prevent="telaAtual = 'cadastro'">Cadastre-se</a>
      </div>
    </div>

    <!-- Tela de Cadastro -->
    <div v-else-if="telaAtual === 'cadastro'" class="cadastro-container">
      <h1 class="text-center">Cadastrar</h1>

      <div class="form-group">
        <label>Usuário:</label>
        <input
          type="text"
          class="form-control"
          v-model="novoUsuario"
          placeholder="Escolha um usuário"
        />
      </div>

      <div class="form-group">
        <label>Senha:</label>
        <input
          type="password"
          class="form-control"
          v-model="novaSenha"
          placeholder="Escolha uma senha"
        />
      </div>

      <div class="form-group">
        <label>Confirmar Senha:</label>
        <input
          type="password"
          class="form-control"
          v-model="confirmarSenha"
          placeholder="Confirme sua senha"
        />
      </div>

      <button
        class="teclado-button btn btn-primary w-100"
        v-on:click="cadastrar"
      >
        Cadastrar
      </button>

      <p v-if="erroMensagem" class="text-danger text-center mt-2">
        {{ erroMensagem }}
      </p>

      <p v-if="sucessoMensagem" class="text-success text-center mt-2">
        {{ sucessoMensagem }}
      </p>

      <div class="cadastro-link">
        <span>Já tem uma conta?</span>
        <a href="#" v-on:click.prevent="voltarLogin">Fazer login</a>
      </div>
    </div>
  </section>
</template>

<script>
import usuarioService from "@/services/usuarioService";
export default {
  name: "LoginJogo",
  props: {
    usuariosIniciais: {
      type: Array,
      default: () => [
        { usuario: "admin", senha: "admin" },
        { usuario: "udesc", senha: "udesc" },
      ],
    },
  },
  data() {
    return {
      telaAtual: "login",
      usuario: "",
      senha: "",
      novoUsuario: "",
      novaSenha: "",
      confirmarSenha: "",
      erroMensagem: "",
      sucessoMensagem: "",
      usuarios: [...this.usuariosIniciais],
    };
  },
  methods: {
    async logar() {
      try {
        this.erroMensagem = "";

        const response = await usuarioService.logar({
          nome: this.usuario,
          senha: this.senha,
        });

        if (response.data.login) this.$emit("logar", this.usuario);
      } catch (err) {
        this.erroMensagem = "Usuário ou senha inválidos!";
      }
    },
    async cadastrar() {
      this.erroMensagem = "";
      this.sucessoMensagem = "";

      // Validações
      if (!this.novoUsuario || !this.novaSenha || !this.confirmarSenha) {
        this.erroMensagem = "Todos os campos são obrigatórios!";
        return;
      }

      if (this.novoUsuario.length < 3) {
        this.erroMensagem = "O usuário deve ter pelo menos 3 caracteres!";
        return;
      }

      if (this.novaSenha.length < 4) {
        this.erroMensagem = "A senha deve ter pelo menos 4 caracteres!";
        return;
      }

      if (this.novaSenha !== this.confirmarSenha) {
        this.erroMensagem = "As senhas não coincidem!";
        return;
      }

      await usuarioService.cadastrar({
        nome: this.novoUsuario,
        senha: this.novaSenha,
      });

      this.sucessoMensagem = "Cadastro realizado com sucesso!";

      // Limpar campos e voltar ao login após 2 segundos
      setTimeout(() => {
        this.voltarLogin();
      }, 1000);
    },
    voltarLogin() {
      this.telaAtual = "login";
      this.limparCampos();
    },
    limparCampos() {
      this.usuario = "";
      this.senha = "";
      this.novoUsuario = "";
      this.novaSenha = "";
      this.confirmarSenha = "";
      this.erroMensagem = "";
      this.sucessoMensagem = "";
    },
  },
};
</script>

<style scoped>
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.login-container,
.cadastro-container {
  width: 100%;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

h1 {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: var(--color-text-light);
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.08);
  color: var(--color-text-light);
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: var(--color-background-button);
}

.form-control::placeholder {
  color: rgba(236, 240, 241, 0.5);
}

.btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.btn-primary {
  background-color: var(--color-background-button);
  color: var(--color-text-light);
}

.btn-primary:hover {
  background-color: #3498db;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.text-danger {
  color: var(--color-text-error);
  font-size: 14px;
  margin: 0;
}

.text-success {
  color: var(--color-text-success);
  font-size: 14px;
  margin: 0;
}

.text-center {
  text-align: center;
}

.mt-2 {
  margin-top: 10px;
}

.cadastro-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.cadastro-link span {
  color: var(--color-text-light);
  margin-right: 5px;
}

.cadastro-link a {
  color: var(--color-text-title);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.cadastro-link a:hover {
  color: var(--color-background-button);
  text-decoration: underline;
}
</style>
