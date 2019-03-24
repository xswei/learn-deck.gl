import Vue from 'vue'
import App from './App.vue'
import mapboxgl from 'mapbox-gl'

import './main.less'


Vue.config.productionTip = false

mapboxgl.accessToken = 'pk.eyJ1IjoieHN3ZWkiLCJhIjoiY2p0bGt0MjU0MjJjMzQzcnJqOXc3azBlbCJ9.VohLw_Qt4Z8Wcojc_ZwTgA'

window.mapboxgl = mapboxgl

new Vue({
  render: h => h(App),
}).$mount('#app')
