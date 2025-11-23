<template>
  <div class="gerenciamento-container">
    <div v-if="telaAtual === 'listagem'" class="listagem-container">
      <h1>Gerenciar Palavras</h1>

      <div class="palavras-lista">
        <div
          class="palavra-item"
          v-for="(item, index) in palavras"
          :key="index"
        >
          <div class="palavra-info">
            <span class="palavra-texto">{{ item.resposta }}</span>
            <span class="palavra-dicas">3 dicas</span>
          </div>
          <button
            v-on:click="excluirPalavra(item.id)"
            title="Excluir"
            style="background-color: transparent; border: none; cursor: pointer"
          >
            <i
              class="bi bi-trash-fill"
              style="font-size: 1.4rem; color: #e74c3c"
            ></i>
          </button>
        </div>
      </div>

      <div class="botoes-container">
        <button class="btn btn-secondary" v-on:click="emit('voltarMenu')">
          Voltar
        </button>
        <button class="btn btn-primary" v-on:click="telaAtual = 'cadastro'">
          Cadastrar
        </button>
      </div>
    </div>

    <div v-else-if="telaAtual === 'cadastro'" class="cadastro-container">
      <h1>Cadastrar Nova Palavra</h1>

      <form class="formulario" v-on:submit.prevent="cadastrarPalavra">
        <div class="form-group">
          <label>Palavra:</label>
          <input
            type="text"
            class="form-control"
            v-model="novaPalavra.resposta"
            placeholder="Digite a palavra"
            required
          />
        </div>

        <div class="form-group">
          <label>Dica 1:</label>
          <input
            type="text"
            class="form-control"
            v-model="novaPalavra.dica1"
            placeholder="Digite a primeira dica"
            required
          />
        </div>

        <div class="form-group">
          <label>Dica 2:</label>
          <input
            type="text"
            class="form-control"
            v-model="novaPalavra.dica2"
            placeholder="Digite a segunda dica"
            required
          />
        </div>

        <div class="form-group">
          <label>Dica 3:</label>
          <input
            type="text"
            class="form-control"
            v-model="novaPalavra.dica3"
            placeholder="Digite a terceira dica"
            required
          />
        </div>

        <div class="botoes-container">
          <button
            type="button"
            class="btn btn-secondary"
            v-on:click="cancelarCadastro"
          >
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </div>
      </form>
    </div>

    <div v-if="mensagemSucesso" class="mensagem-sucesso">
      {{ mensagemSucesso }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits, onBeforeMount } from "vue";
import palavraService from "@/services/palavraService";

const emit = defineEmits(["atualizar-palavras", "voltarMenu"]);

const telaAtual = ref("listagem");
const palavras = ref([]);

const novaPalavra = reactive({
  resposta: "",
  dica1: "",
  dica2: "",
  dica3: "",
});

const mensagemSucesso = ref("");

onBeforeMount(() => {
  carregarPalavras();
});

async function carregarPalavras() {
  const response = await palavraService.listar();
  palavras.value = response;
  console.log(palavras.value);
}

// --- Métodos ---
async function excluirPalavra(id) {
  if (confirm("Tem certeza que deseja excluir esta palavra?")) {
    await palavraService.excluir(id);
    carregarPalavras();
    mostrarMensagem("Palavra excluída com sucesso!");
  }
}

async function cadastrarPalavra() {
  const palavra = {
    resposta: novaPalavra.resposta,
    dicas1: novaPalavra.dica1,
    dicas2: novaPalavra.dica2,
    dicas3: novaPalavra.dica3,
  };

  await palavraService.cadastrar(palavra);
  carregarPalavras();

  mostrarMensagem("Palavra cadastrada com sucesso!");
  limparFormulario();
  telaAtual.value = "listagem";
}

function cancelarCadastro() {
  limparFormulario();
  telaAtual.value = "listagem";
}

function limparFormulario() {
  novaPalavra.resposta = "";
  novaPalavra.dica1 = "";
  novaPalavra.dica2 = "";
  novaPalavra.dica3 = "";
}

function mostrarMensagem(mensagem) {
  mensagemSucesso.value = mensagem;
  setTimeout(() => {
    mensagemSucesso.value = "";
  }, 3000);
}
</script>

<style scoped>
.gerenciamento-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
}

.listagem-container,
.cadastro-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

h1 {
  text-align: center;
  color: var(--color-text-title);
  margin-bottom: 10px;
}

/* Listagem de Palavras */
.palavras-lista {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 500px;
  overflow-y: auto;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.palavra-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.palavra-item:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

.palavra-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
}

.palavra-texto {
  font-size: 18px;
  font-weight: bold;
  color: var(--color-text-light);
}

.palavra-dicas {
  font-size: 14px;
  color: var(--color-text-title);
}

/* Formulário de Cadastro */
.formulario {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 16px;
  font-weight: bold;
  color: var(--color-text-light);
}

.form-control {
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

/* Botões */
.botoes-container {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.btn {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
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

.btn-secondary {
  background-color: #34495e;
  color: var(--color-text-light);
}

.btn-secondary:hover {
  background-color: #2c3e50;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.btn-danger {
  background-color: var(--color-text-error);
  color: var(--color-text-light);
}

.btn-danger:hover {
  background-color: #e74c3c;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* Mensagem de Sucesso */
.mensagem-sucesso {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: var(--color-text-success);
  color: white;
  padding: 15px 25px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
  z-index: 1000;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Scrollbar customizada */
.palavras-lista::-webkit-scrollbar {
  width: 8px;
}

.palavras-lista::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.palavras-lista::-webkit-scrollbar-thumb {
  background: var(--color-background-button);
  border-radius: 10px;
}

.palavras-lista::-webkit-scrollbar-thumb:hover {
  background: #3498db;
}
</style>
