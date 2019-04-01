<template>
    <div class="article">
        <h1>{{ title }}</h1>

        <p>Published on {{ published | moment }}</p>
        <p class="lead">{{ content }}</p>
        <p>Shares: {{ shares }}</p>

        <p class="lead">{{content}}</p>
        <app-author :author="author"></app-author>
        <br><br>
        <app-social-sharing :article="$data" @articleWasShared="shared('Hello!',$event)"></app-social-sharing>
    </div>
</template>

<script>
    import moment from 'moment';
    import Author from './Author.vue';
    import Social from './Social.vue';

    export default {
        data() {
            return {
                title: '10 Reasons why Vue.js is Awesome',
                published: new Date(),
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan eu erat ut scelerisque.',
                author: {
                    firstName: 'Lord',
                    lastName: 'Wander'
                },
                shares: 0
            };
        },
        methods: {
            shared: function(message, events){
                console.log(message)
                console.log(events)
                this.shares ++;
            }
        },
        filters: {
            moment: function(value) {
                return moment(value).format('MMMM Do');
            }
        },
        components: {
            appAuthor: Author,
            appSocialSharing: Social
        }
    }
</script>

<style>
*{

    font-weight: bold;
}
</style>

<style scoped>
    *{
       color:brown; 
    }
</style>