<template>
<div id="app">
  <h1>Jogo da Forca Vue.js</h1>
  <section v-if="tela === 'inicio'" id="inicio">
    <Formulario
    v-if="etapa === 'palavra'"
    title="Defina a Palavra"
    button="Próximo"
    :action="setPalavra"
    /> 
    <Formulario
    v-if="etapa === 'dica'"
    title="Defina a Dica"
    button="Iniciar o Jogo "
    :action="setDica"
    />
  </section>

  <section v-if="tela === 'jogo'" id="jogo">
    <Jogo :erros="erros"
      :palavra="palavra"
      :dica="dica"
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

import Formulario from './components/Formulario.vue'
import Jogo from './components/Jogo.vue'
import './css/global.css'

export default {
  name: 'App',
  components:{
    Formulario,
    Jogo
  },
  data(){
    return{
      tela: 'inicio',
      etapa: 'palavra',
      palavra: '',
      dica: '',
      erros: 0,
      letras: [] 
    }
  },   
  methods:{
    setPalavra: function(palavra){
      this.palavra = palavra;
      this.etapa = 'dica';
    },
    setDica: function(dica){
      this.dica = dica;
      this.etapa = 'jogo';
      this.tela = 'jogo';
    },
    verificarLetra: function(letra){
      return this.letras.find(item => item.toLowerCase() === letra.toLowerCase());
    },
    jogar: function(letra){
      this.letras.push(letra);
      this.verificarErro(letra);
    },
    verificarErro: function(letra){

      if(this.palavra.toLowerCase().indexOf(letra.toLowerCase()) >= 0)
        return this.verificarAcertos();
      
      this.erros++;

      if(this.erros == 6)
        this.etapa = 'enforcado'
    },

    verificarAcertos: function(){
      let letrasUnicas = [...new Set(this.palavra.split(''))];
      if(letrasUnicas.length === (this.letras.length - this.erros)){
        this.etapa = 'ganhador'
      }

    },
    jogarNovamente: function(){
      this.palavra = '';
      this.dica = '';
      this.erros = 0;
      this.letras = [];
      this.tela = 'inicio';
      this.etapa = 'palavra';
    }
  }
}
</script>

<style scoped>
  #app{ 
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
</style>