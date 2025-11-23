<template>
  <div class="ranking-container">
    <h1>Ranking</h1>

    <div class="ranking-table">
      <div class="ranking-header">
        <div class="ranking-col">Posição</div>
        <div class="ranking-col">Jogador</div>
        <div class="ranking-col">Pontos</div>
      </div>

      <div
        class="ranking-row"
        v-for="(item, index) in rankingData"
        :key="index"
        :class="{ 'ranking-destaque': item.nome === props.usuarioLogin }"
      >
        <div class="ranking-col">
          <span class="posicao">{{ index + 1 }}º</span>
        </div>
        <div class="ranking-col jogador">{{ item.nome }}</div>
        <div class="ranking-col pontos">{{ item.pontos }}</div>
      </div>
    </div>

    <button
      class="teclado-button btn btn-primary"
      v-on:click="emit('voltarMenu')"
    >
      Voltar ao Menu
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onBeforeMount } from "vue";
import usuarioService from "@/services/usuarioService";

const props = defineProps({
  usuarioLogin: String,
});

const emit = defineEmits(["voltarMenu"]);

onBeforeMount(() => {
  getJogadores();
});

const rankingData = ref([]);

const getJogadores = async () => {
  const dados = await usuarioService.listar();
  console.log(dados);
  if (dados) {
    rankingData.value = dados;
    rankingData.value.sort((a, b) => b.pontos - a.pontos);
  }
};
</script>

<style scoped>
/* Estilos do Ranking */
.ranking-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 30px;
  padding: 20px;
  width: 100%;
  max-width: 800px;
}

.ranking-table {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.ranking-header {
  display: grid;
  grid-template-columns: 100px 1fr 150px;
  background-color: var(--color-background-button);
  padding: 15px;
  font-weight: bold;
  font-size: 18px;
}

.ranking-row {
  display: grid;
  grid-template-columns: 100px 1fr 150px;
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
}

.ranking-row:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.ranking-row:last-child {
  border-bottom: none;
}

.ranking-destaque {
  background-color: rgba(46, 204, 113, 0.2);
  border-left: 4px solid var(--color-text-success);
}

.ranking-col {
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.posicao {
  font-weight: bold;
  font-size: 20px;
  color: var(--color-text-title);
}

.jogador {
  font-size: 16px;
}

.pontos {
  justify-content: flex-end;
  font-size: 18px;
  font-weight: bold;
  color: var(--color-text-success);
}

.ranking-container button {
  max-width: 300px;
}
</style>
