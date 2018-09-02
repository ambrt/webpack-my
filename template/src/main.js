{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
var elasticsearch = require('elasticsearch')
var esclient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})
Vue.directive('false', {
  // When the bound element is inserted into the DOM...
  inserted: function (el, binding, vnode) {
    // Focus the element
    el.style.display = 'none'

    // el.remove()
    // vnode.context // vm
    // el.parentElement.removeChild(el)
  }
})
Vue.prototype.$elastic = esclient
Vue.config.productionTip = false
Vue.use(Buefy)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
