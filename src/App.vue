<template>
  <div id="app">
    <section
      id="login"
      v-if="etapa == 'login'"
      class="d-flex flex-column gap-3"
    >
      <LoginJogo @logar="logar" />
    </section>

    <section id="menu" v-else-if="etapa == 'inicio'">
      <h1>Jogo da Forca</h1>
      <button class="teclado-button btn btn-primary" v-on:click="iniciarJogo">
        Iniciar Jogo
      </button>
      <button
        class="teclado-button btn btn-primary"
        v-on:click="etapa = 'ranking'"
      >
        Ranking
      </button>
      <button
        v-if="usuarioLogin === 'admin'"
        class="teclado-button btn btn-secondary"
        v-on:click="etapa = 'gerenciar'"
      >
        Gerenciar Palavras
      </button>
    </section>

    <section
      id="jogo"
      v-else-if="etapa == 'jogo' || etapa == 'enforcado' || etapa == 'ganhador'"
    >
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
        :usuario="usuarioLogin"
      />
    </section>

    <section id="ranking" v-else-if="etapa == 'ranking'">
      <RankingJogadores @voltarMenu="voltarMenu" :usuarioLogin="usuarioLogin" />
    </section>

    <section id="gerenciar" v-else-if="etapa == 'gerenciar'">
      <GerenciadorPalavra @voltarMenu="voltarMenu" />
    </section>
  </div>
</template>

<script>
import Jogo from "./components/Jogo.vue";
import "./css/global.css";
//import { palavras } from "./mocks/db";
import RankingJogadores from "./components/RankingJogadores.vue";
import GerenciadorPalavra from "./components/GerenciadorPalavra.vue";
import palavraService from "./services/palavraService";
import LoginJogo from "./components/LoginJogo.vue";

export default {
  name: "App",
  components: {
    Jogo,
    LoginJogo,
    RankingJogadores,
    GerenciadorPalavra,
  },
  async created() {
    await this.buscarPalavras();
  },
  data() {
    return {
      tela: "inicio",
      etapa: "login",
      palavra: "",
      dicas: [],
      erros: 0,
      letras: [],
      usuarioLogin: "",
      senhaLogin: "",
      erroLogin: "",
      rankingData: [
        { jogador: "admin", pontos: 2500 },
        { jogador: "udesc", pontos: 1850 },
        { jogador: "maria_silva", pontos: 1200 },
        { jogador: "joao123", pontos: 980 },
        { jogador: "ana_costa", pontos: 750 },
        { jogador: "pedro_santos", pontos: 620 },
        { jogador: "lucas_oliveira", pontos: 450 },
        { jogador: "carla_souza", pontos: 380 },
        { jogador: "rafael_lima", pontos: 290 },
        { jogador: "juliana_martins", pontos: 150 },
      ],
      palavras: [],
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
      if (letrasUnicas.length === this.letras.length - this.erros) {
        this.etapa = "ganhador";
      }
    },
    gerarJogo: function () {
      this.etapa = "jogo";
      const palavraAleatoria =
        this.palavras[Math.floor(Math.random() * this.palavras.length)];
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
    logar: function (usuario) {
      this.erroLogin = "";
      this.etapa = "inicio";
      this.usuarioLogin = usuario;
    },
    buscarPalavras: async function () {
      try {
        const resposta = await palavraService.listar();
        this.palavras = resposta;
      } catch (error) {
        console.error("Erro ao buscar palavras:", error);
      }
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

button {
  width: 100%;
}
</style>
