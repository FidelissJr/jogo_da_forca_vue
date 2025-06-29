<template>
  <div class="carousel-container">
    <button @click="voltarDica" :disabled="indiceAtual === 0">⬅</button>

    <div class="dica-quadro">
      <p>{{ dicas[indiceAtual] }}</p>
    </div>

    <button @click="avancarDica" :disabled="indiceAtual === dicas.length - 1">
      ➡
    </button>
  </div>
</template>

<script>
export default {
  name: "DicaCarousel",
  props: {
    dicas: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      indiceAtual: 0,
    };
  },
  methods: {
    avancarDica() {
      if (this.indiceAtual < this.dicas.length - 1) {
        this.indiceAtual++;
      }
    },
    voltarDica() {
      if (this.indiceAtual > 0) {
        this.indiceAtual--;
      }
    },
  },
};
</script>

<style scoped>
.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.dica-quadro {
  border: 2px solid #444;
  padding: 20px;
  width: 100%;
  text-align: center;
  background-color: transparent;
  border-radius: 8px;
  font-weight: bold;
}

button {
  padding: 10px 15px;
  font-size: 20px;
  cursor: pointer;
  color: aqua;
  background-color: transparent;
  border-radius: 8px;
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
