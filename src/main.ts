import './style.css'
import { createApp } from 'vue'

import 'primeicons/primeicons.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router';
import Aura from '@primevue/themes/aura'
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';

import ToastService from 'primevue/toastservice';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import ToggleSwitch from 'primevue/toggleswitch';
import Fieldset from 'primevue/fieldset';
import Calendar from 'primevue/calendar';
import Select from 'primevue/select';

import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';    

import Dialog from 'primevue/dialog';


import Toast from 'primevue/toast';

import  Tag  from 'primevue/tag';
import InputNumber from 'primevue/inputnumber';

import ProgressSpinner from 'primevue/progressspinner';


const app = createApp(App)
app.use(ToastService);
app.use(router); 
app.use(createPinia());
app.use(VueQueryPlugin);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    // options: {
    //   darkModeSelector: '.my-app-dark'
    // }
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

app.component('Stepper', Stepper)
app.component('StepList', StepList)
app.component('StepPanels', StepPanels)
app.component('StepItem', StepItem)
app.component('Step', Step)
app.component('StepPanel', StepPanel)

app.component('Menubar', Menubar)
app.component('Avatar', Avatar)
app.component('Menu', Menu)

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);

app.component('Tag', Tag);

app.component('Dialog', Dialog);

app.component('Toast', Toast);

app.component('InputNumber', InputNumber);

app.component('ProgressSpinner', ProgressSpinner);
app.mount('#app')
