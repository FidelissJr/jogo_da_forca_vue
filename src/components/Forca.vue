<template>
    <div id="forca">
        <img :src="`https://raw.githubusercontent.com/william-costa/wdev-hangman-game-resources/master/images/hangman/${erros}.svg`" alt="">
    </div>
</template>

<script>
export default {
    name: 'Forca-nome',
    props:{
        erros: Number
    },
}
</script>

<style scoped>
#forca img{
    height: 30vh;
}

</style>