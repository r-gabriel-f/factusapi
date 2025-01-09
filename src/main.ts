import './style.css'
import { createApp } from 'vue'

import 'primeicons/primeicons.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router';
import Aura from '@primevue/themes/aura'
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import ToggleSwitch from 'primevue/toggleswitch';
import Fieldset from 'primevue/fieldset';
import Calendar from 'primevue/calendar';
import Select from 'primevue/select';

const app = createApp(App)
app.use(router); 
app.use(createPinia());
app.use(VueQueryPlugin);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark'
    }
  }
})

app.component('Button', Button)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('InputText', InputText)
app.component('Fieldset', Fieldset)
app.component('ToggleSwitch', ToggleSwitch)
app.component('Calendar', Calendar)
app.component('Select', Select)
app.mount('#app')
