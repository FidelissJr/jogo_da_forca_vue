<template>
  <div id="app">
    <h1>Jogo da Forca</h1>
    <section id="jogo">
      <Jogo
        :erros="erros"
        :palavra="palavra"
        :dicas="dicas"
        :verificarLetra="verificarLetra"
        :etapa="etapa"
        :letras="letras"
        :jogar="jogar"
        :jogarNovamente="jogarNovamente"
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
      etapa: "jogo",
      palavra: "",
      dicas: [],
      erros: 0,
      letras: [],
    };
  },
  mounted() {
    this.iniciarJogo();
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
      let letrasUnicas = [...new Set(this.palavra.split(""))];
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
      this.gerarJogo();
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
</style>
