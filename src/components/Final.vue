<template>
  <div id="final">
    <div :class="`final-texto ${etapa}`">
      {{ texto }}
    </div>
    <div style="display: flex; flex-direction: column; gap: 8px">
      <button v-on:click="voltarMenu" id="btnFinal" class="btn btn-secondary">
        Sair
      </button>
      <button v-on:click="jogarNovamente" id="btnFinal" class="btn btn-primary">
        Jogar novamente
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "final-nome",
  props: {
    etapa: String,
    texto: String,
    jogarNovamente: Function,
    voltarMenu: Function,
  },
};
</script>

<style scoped>
.final-texto {
  margin: 20px 0;
  font-size: 24px;
  font-weight: bold;
}
.final-texto.enforcado {
  color: var(--color-text-error);
}
.final-texto.ganhador {
  color: var(--color-text-success);
}
</style>
