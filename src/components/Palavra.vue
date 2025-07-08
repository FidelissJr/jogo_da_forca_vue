<template>
  <div id="palavra">
    <div class="palavra-letras">
      <div v-for="(letra, key) in palavra" :key="key">
        <span :class="letra != ' ' ? 'palavra-letra' : 'espaco'">
          {{
            verificarLetra(letra) || etapa === "enforcado"
              ? letra
              : letra === " "
              ? " "
              : ""
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Palavra-nome",
  props: {
    palavra: String,
    dicas: Array,
    verificarLetra: Function,
    etapa: String,
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

/* Para telas pequenas (celulares) */
@media (max-width: 768px) {
  .palavra-letra {
    height: 15px;
    width: 15px;
    margin: 0 5px;
    border-bottom: 1px solid var(--color-text-light);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.espaco {
  margin: 0 12px 0 12px;
}
</style>
