<template>
  <div id="jogo">
    <ConfettiExplosion
      v-if="showConfetti"
      :stageHeight="400"
      :stageWidth="1000"
      :particleSize="15"
    />

    <Dicas :dicas="dicas" />

    <Forca :erros="erros" />

    <Palavra
      :palavra="palavra"
      :dicas="dicas"
      :verificarLetra="verificarLetra"
      :etapa="etapa"
    />

    <Teclado
      v-if="etapa === 'jogo'"
      :letras="letras"
      :verificarLetra="verificarLetra"
      :jogar="jogar"
    />
    <Final
      v-if="etapa != 'jogo'"
      :etapa="etapa"
      :texto="etapa === 'ganhador' ? 'Parabéns :)' : 'Tente de novo :('"
      :jogarNovamente="jogarNovamente"
      :voltarMenu="voltarMenu"
    />
  </div>
</template>

<script>
import Forca from "./Forca.vue";
import Palavra from "./Palavra.vue";
import Teclado from "./Teclado.vue";
import Final from "./Final.vue";
import Dicas from "./Dicas.vue";
import ConfettiExplosion from "vue-confetti-explosion";
import usuarioService from "@/services/usuarioService";

export default {
  name: "Jogo-nome",
  props: {
    erros: Number,
    palavra: String,
    dicas: Array,
    verificarLetra: Function,
    etapa: String,
    letras: Array,
    jogar: Function,
    jogarNovamente: Function,
    voltarMenu: Function,
    usuario: String,
  },
  data() {
    return {
      showConfetti: false,
    };
  },
  watch: {
    etapa(newValue) {
      if (newValue === "ganhador") this.ganharJogo();
    },
  },
  components: {
    Forca,
    Palavra,
    Teclado,
    Final,
    Dicas,
    ConfettiExplosion,
  },
  methods: {
    async ganharJogo() {
      this.showConfetti = true;
      try {
        await usuarioService.pontuar(this.usuario);
      } catch (error) {
        console.error("Erro ao atualizar pontuação:", error);
      }
    },
  },
};
</script>

<style scoped>
#jogo {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
