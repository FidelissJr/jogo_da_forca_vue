<template>
    <div id="form">
        <div id="form-title">
            {{title}}
        </div>
        <input class="form-control" type="text" v-model="inputValue">
        <button v-on:click="onSubmit" :disabled="inputValue.length == 0" class="btn btn-primary">{{button}}</button>
    </div>
</template>

<script>
    export default {
        name: 'Formulario-name',
        props:{
            title: String,
            button: String,
            action: Function
        },
        data(){
            return{
                inputValue: ''
            }
        },
        methods:{
            onSubmit: function(){
                this.action(this.inputValue);
                this.inputValue = '';
            }
        }
    }
</script>

<style scoped>

    #form input{
        max-width: 200px;
    }
    #form{
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        justify-content: center;
        margin-top: 20px;
    }

    #form input{ 
        padding: 8px 5px;
        margin: 15px 0;
        color: var(--color-text-dark );
    }
</style>