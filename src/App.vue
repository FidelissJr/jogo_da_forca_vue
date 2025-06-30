<template>
  <div id="app">
    <section id="menu" v-if="etapa == 'inicio'">
      <h1>Jogo da Forca</h1>
      <button class="teclado-button btn btn-primary" v-on:click="iniciarJogo">
        Iniciar Jogo
      </button>
    </section>
    <section id="jogo" v-else>
      <Jogo
        :erros="erros"
        :palavra="palavra"
        :dicas="dicas"
        :verificarLetra="verificarLetra"
        :etapa="etapa"
        :letras="letras"
        :jogar="jogar"
        :jogarNovamente="jogarNovamente"
        :voltarMenu="voltarMenu"
      />
    </section>
  </div>
</template>

<script>
import Jogo from "./components/Jogo.vue";
import "./css/global.css";
import { palavras } from "./mocks/db";

export default {
  name: "App",
  components: {
    Jogo,
  },
  data() {
    return {
      tela: "inicio",
      etapa: "inicio",
      palavra: "",
      dicas: [],
      erros: 0,
      letras: [],
    };
  },
  methods: {
    setPalavra: function (palavra) {
      this.palavra = palavra;
    },
    setDicas: function (dicas) {
      this.dicas = dicas;
    },
    verificarLetra: function (letra) {
      return this.letras.find(
        (item) => item.toLowerCase() === letra.toLowerCase()
      );
    },
    iniciarJogo: function () {
      this.gerarJogo();
    },
    jogar: function (letra) {
      this.letras.push(letra);
      this.verificarErro(letra);
    },
    verificarErro: function (letra) {
      if (this.palavra.toLowerCase().indexOf(letra.toLowerCase()) >= 0)
        return this.verificarAcertos();

      this.erros++;

      if (this.erros == 6) this.etapa = "enforcado";
    },
    verificarAcertos: function () {
      let letrasUnicas = [
        ...new Set(
          this.palavra.split("").filter((letter) => letter.trim() !== "")
        ),
      ];
      console.log(letrasUnicas);
      if (letrasUnicas.length === this.letras.length - this.erros) {
        this.etapa = "ganhador";
      }
    },
    gerarJogo: function () {
      this.etapa = "jogo";
      const palavraAleatoria =
        palavras[Math.floor(Math.random() * palavras.length)];
      this.setPalavra(palavraAleatoria.resposta);
      this.setDicas(palavraAleatoria.dicas);
    },
    jogarNovamente: function () {
      this.resetar();
      this.gerarJogo();
    },
    voltarMenu: function () {
      this.etapa = "inicio";
      this.resetar();
    },
    resetar: function () {
      this.etapa = "inicio";
      this.erros = 0;
      this.letras = [];
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

#menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
}
</style>
