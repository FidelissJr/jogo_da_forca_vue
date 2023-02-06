<template>
    <div id="teclado">      
        <button class="teclado-button btn btn-primary" v-for="(letra, key) in 'abcdefghijklmnopqrstuvwxyz'" 
        :key="key"
        :disabled="verificarLetra(letra)"
        v-on:click="jogar(letra)">   
        {{letra}}
        </button>
    </div>
</template>

<script>
export default {
    name: 'Teclado-nome',
    props:{
        letras: Array,
        verificarLetra: Function,
        jogar: Function
    },    
}
</script>

<style scoped>
#teclado{
    display: flex;
    max-width: 80%;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    
}

#teclado button{
    margin: 5px;
    text-transform: uppercase;
}

</style>