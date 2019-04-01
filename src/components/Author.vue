<template>
    <small>Written by {{ author.firstName }} {{ author.lastName }}</small>
</template>

<script>
    import {eventBus} from '../main.js' 

    export default {
        props: {
            author: {
                type: Object,
                required: true,
                default: function(){
                    return {}
                }
            }
        
        },
        created(){
            eventBus.$on('articleWasShared',(data)=>{
                alert("Someone shared an article on " + data.media + "|")
            })
        }
    }
</script>