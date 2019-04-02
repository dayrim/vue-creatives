<template>
<div class="container" id="app" :class="{ready: isPageReady}">
       <div class="row">
            <div class="col">
 
                <button class="btn btn-primary" @click="show = !show">
                Toggle Menu
                </button>    
              
                <button class="btn btn-primary" @click="toggleMenu">
                Toggle another Menu
                </button>   

                <button class="btn btn-primary" @click="changeShape">
                Switch Shape
                </button>    
                <hr>
                <nav>
                    <ul>
                        <li>
                        <transition name="menu-item1" mode="out-in">
                        <a class="menu-item" key="item1" v-if="show">Blog Post </a> 
                        <!-- <a class="menu-item" key="intro" v-else>Menu ninja</a>  -->
                        </transition>
                        </li>

                        <li>
                        <transition name="menu-item2">
                        <a class="menu-item" key="item2" v-if="show">Article</a> 
                        </transition>
                        </li>


                        <li>
                        <transition name="menu-item3">
                        <a class="menu-item" key="item3" v-if="show">Contact Us</a> 
                        </transition>
                        </li>
                    </ul>
                </nav>
                <transition name="shape" mode="out-in">
                <component  :is="shape"></component>
                </transition>
                <nav >
                              <ul>
                <transition-group name="menu" appear>
                        <li :key="index" v-for="(item, index) in visibleMenuItems" >
                        <a class="menu-item" >{{item}}</a> 
                        </li >
                </transition-group>
                            </ul>
                </nav>
                    </div>
                </div>

        <div class="row">
            <div class="col">
                <h1>Add Blog Post</h1>

                <form @submit.prevent="isSubmitted = true">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" id="title" v-model.trim="post.title">
                    </div>

                    <div class="form-group">
                        <label for="content">Content</label>
                        <textarea class="form-control" id="content" v-model.lazy.trim="post.content" cols="30" rows="10"></textarea>
                    </div>

                    <div class="form-group">
                      <input type="checkbox" id="publish-immediately" true-value="immediately" false-value="later" v-model="post.publishImmediately">
                      <label for="content">Publish Immediately</label>
                    </div>

                    <div class="form-group">
                      <label>Share on</label>
                      <div v-for="(media, index) in formData.socialMedia" :key="index">
                        <input type="checkbox" :id="media" :value="media" v-model="post.shareOn" >
                        <label :for="media">{{media}}</label>
                        </div>
                        </div>

                                            <div class="form-group">
                      <label>Category</label>
                      <div v-for="(category, index) in formData.categories" :key="index">
                        <input type="radio" :id="category" :value="category" v-model="post.category" >
                        <label :for="category">{{category}}</label>
                        </div>
                        </div>

                    <div class="form-group">
                      <select class="form-control" id="select-series" v-model="post.series">
                        <option value="">Choose series</option>
                        <option v-for="(series,index) in formData.series" :key="index" :value="series">{{series}}</option>
                      </select></div>

                      <input type="submit" class="btn btn-primary" value="Publish">
                </form>

                <hr>

                <table class="table table-striped" v-if="isSubmitted">
                    <thead>
                        <tr>
                            <td class="col-xs-6"><strong>Field</strong></td>
                            <td class="col-xs-6"><strong>Value</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Title</td>
                            <td>{{ post.title }}</td>
                        </tr>
                        <tr>
                            <td>Content</td>
                            <td style="white-space: pre;">{{ post.content }}</td>
                        </tr>
                        <tr>
                            <td>Publish immediately</td>
                            <td>{{ post.publishImmediately }}</td>
                        </tr>
                        <tr>
                            <td>Share on</td>
                            <td>
                                <ul>
                                    <li v-for="(media,index) in post.shareOn" :key="index">{{ media }}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>{{ post.category }}</td>
                        </tr>
                        <tr>
                            <td>Series</td>
                            <td>{{ post.series }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
              
  <div class="row">
    <div class="col-xs-12">
      <announcement></announcement>
      <appArticle></appArticle>
      <hr>

      <appContact>
        <p>Some content</p>
        <p slot="top">Contact us and one of our representives will get back to you as soon as possible</p>
        <p slot="bottom">Please do not submit any sensitive information</p>
      </appContact>
      </div>
    </div>
           
  </div>
  
</template>

<script>
import Square from './components/Square.vue'
import Circle from './components/Circle.vue'
    export default {
        data() {
            return {
              show:false,
              shape: 'appSquare',
              isPageReady: false,
              menuItems: ['Blog Post','Article','Contact'],
              visibleMenuItems: [],
              isSubmitted: false,
              moreStyles: {
                    'border-radius': '5px',
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center'
              },
                post: {
                    title: '',
                    content: '',
                    publishImmediately: 'immediately',
                    shareOn: ['Facebook'],
                    category: 'Backend',
                    series: 'Complete Guide to Elasticsearch'
                },
                formData: {
                    socialMedia: ['Facebook', 'Twitter'],
                    categories: ['Frontend', 'Backend'],
                    series: [
                        'Vue.js: From Beginner to Professional',
                        'Complete Guide to Elasticsearch'
                    ]
                }
            };
        },
        methods: {
            changeShape(){
                if (this.shape === 'appSquare'){
                    this.shape = 'appCircle'
                }else{
                    this.shape = 'appSquare'
                }
            },
            toggleMenu(){
            if(this.visibleMenuItems.length < 1){
                    this.menuItems.map((item, index)=>{
                        setTimeout(()=>{
                            this.visibleMenuItems.push(item)
                        },250*(index+1))
                    })
                }
                else{
                    this.visibleMenuItems=[]
                }
            }
        },
        mounted: function() {
            this.$nextTick(function() {
            setTimeout(() => {
                this.isPageReady = true;
            }, 0)
        });
        
        },
        components:{
            appSquare: Square,
            appCircle: Circle
        }
    }
</script>

<style>
    ul{
        list-style: none;
    }
    .btn{
        margin-right: 20px;
    }
    input[type="radio"] + label,
    input[type="checkbox"] + label {
        font-weight: normal;
    }
    .menu-item{
        display: inline-block;
    }

    .menu-item1-enter-active{
        animation: pulse 0.5s;
    }
    .menu-item1-leave-active{
        animation: fade-out 1s;
    }

    .menu-item2-enter-active{
        animation: pulse 0.75s;
    }
    .menu-item2-leave-active{
        animation: fade-out 1s;
    }
    .menu-item3-enter-active{
        animation: pulse 1s;
    }
    .menu-item3-leave-active{
        animation: fade-out 1s;
    }
    #app.ready {
        opacity: 1;
    }

    .shape-enter-active, .shape-leave-active{
        transition: opacity 1s ease;
    }

    .shape-enter, .shape-leave-to{
        opacity: 0;
    }
    #app {
        opacity: 0;
        transition: opacity 1s;
    }
    .menu-enter-active, .menu-leave-active{
        transition: all 0.75s ease;
    }

    .menu-enter, .menu-leave{
        opacity:0;
        transform: rotate(45deg) translateY(-30px);
    }
    @keyframes fade-out{
        from{
            opacity:1;
            transition: opacity;
        }

        to{
            opacity: 0;
        }
    }

    @keyframes pulse{
        from{
            transform: scale3d(1,1,1)
        }

        50%{
            transform: scale3d(1.2,1.2,1.2);
        }

        to{
            transform: scale3d(1,1,1)
        }
    }
</style>