import Vue from 'vue'
import App from './App.vue'
import TButton from '@/components/common/TButton';
import IconCross from "@/components/icons/IconCross";
import IconZero from "@/components/icons/IconZero";
import 'animate.css/animate.min.css';
import './scss/common.scss';

Vue.component('TButton', TButton);
Vue.component('cross', IconCross);
Vue.component('zero', IconZero);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
