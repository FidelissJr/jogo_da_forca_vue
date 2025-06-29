<template>
  <div id="palavra">
    <div class="palavra-letras">
      <div class="palavra-letra" v-for="(letra, key) in palavra" :key="key">
        {{ verificarLetra(letra) || etapa === "enforcado" ? letra : "" }}
      </div>
    </div>
    <Dicas :dicas="dicas" />
  </div>
</template>

<script>
import Dicas from "./Dicas.vue";

export default {
  name: "Palavra-nome",
  props: {
    palavra: String,
    dicas: Array,
    verificarLetra: Function,
    etapa: String,
  },
  components: {
    Dicas,
  },
};
</script>

<style scoped>
#palavra {
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}

.palavra-letras {
  display: flex;
  margin-bottom: 20px;
}

.palavra-letra {
  height: 30px;
  width: 30px;
  margin: 0 5px;
  border-bottom: 1px solid var(--color-text-light);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
