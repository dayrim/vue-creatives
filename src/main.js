import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Announcement from './components/Announcement.vue'
import Article from './components/Article.vue'
import Contact from './components/Contact.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


export const eventBus = new Vue()
Vue.use(BootstrapVue)

Vue.config.productionTip = false
Vue.component('announcement',Announcement);
Vue.component('appArticle',Article);
Vue.component('appContact',Contact);

new Vue({
  render: h => h(App),
}).$mount('#app')
