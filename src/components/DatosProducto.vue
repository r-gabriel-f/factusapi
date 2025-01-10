<template>
  <div class="card">
    <Fieldset legend="Productos o Servicios">
      <div class="grid grid-cols-2 gap-5">
        <div class="flex flex-col space-y-2">
          <label for="codeReference">Código de Referencia</label>
          <InputText id="codeReference" v-model="code_reference" placeholder="Ingrese el código de referencia" />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="name">Nombre del Producto</label>
          <InputText id="name" v-model="name" placeholder="Ingrese el nombre del producto o servicio" />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="quantity">Cantidad</label>
          <InputText id="quantity" v-model="quantity" placeholder="Ingrese la cantidad" type="text" />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="price">Precio</label>
          <InputText id="price" v-model="price" placeholder="Ingrese el precio" type="text" />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="discountRate">Tasa de Descuento (%)</label>
          <InputText id="discountRate" v-model="discount_rate" placeholder="Ingrese la tasa de descuento" type="text" />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="taxRate">Tasa de Impuesto (%)</label>
          <InputText id="taxRate" v-model="tax_rate" placeholder="Ingrese la tasa de impuesto" type="text" />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="unitMeasureId">ID Unidad de Medida</label>
          <Select v-model="unit_measure_id" :options="dataUnidadMedida" optionLabel="name"
            placeholder="Ingrese el ID de la unidad de medida" class="w-full" filter />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="standardCodeId">ID Código de Estándar</label>
          <Select v-model="standard_code_id" :options="dataIdentificacion" optionLabel="nombre"
            placeholder="Ingrese el ID del código estándar" class="w-full" filter />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="isExcluded">Excluido de IVA</label>
          <Select v-model="is_excluded" :options="dataIva" optionLabel="nombre" placeholder="Ingrese el ID del IVA"
            class="w-full" />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="tributeId">ID del Tributo</label>
          <Select v-model="tribute_id" :options="dataTribute" optionLabel="name" placeholder="Ingrese el ID del tributo"
            class="w-full" filter />
        </div>
        <div class="card flex justify-center gap-2">
          <p>Retenciones</p>
          <ToggleSwitch v-model="withholdingEnabled" />
        </div>
        <div v-if="withholdingEnabled">
          <div class="col-span-2 flex flex-col space-y-2">
            <label for="withholdingCode">Retención - Código</label>
            <Select v-model="withholdingCode" :options="dataTribute" optionLabel="code"
              placeholder="Ingrese el código de la retención" class="w-full" filter />
          </div>
          <div class="col-span-2 flex flex-col space-y-2">
            <label for="withholdingRate">Retención - Tasa (%)</label>
            <InputText id="withholdingRate" v-model="withholdingRate" placeholder="Ingrese la tasa de la retención"
              type="text" />
          </div>
        </div>
      </div>
    </Fieldset>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import unidadmedidaService from "../services/Factus/unidadmedida.service";
import productsService from "../services/Factus/atributes.service";
import type { Unidadmedida } from "../models/unidadmedida";
import type { Product } from "../models/product";

const code_reference = ref("");
const name = ref("");
const quantity = ref('');
const price = ref('');
const discount_rate = ref('');
const tax_rate = ref('');
const unit_measure_id = ref("");
const standard_code_id = ref("");
const is_excluded = ref(0);
const tribute_id = ref("");

const withholdingCode = ref("");
const withholdingRate = ref('');

const withholdingEnabled = ref(false);


const dataUnidadMedida = ref<Unidadmedida[]>([])

const { data, isFetched } = unidadmedidaService.useListQuery();


const dataTribute = ref<Product[]>([]);
const { data: datProduct, isFetched: isFetchedProduct } = productsService.useListQuery();


const dataIva = ref([
  { "id": 0, "name": "No" },
  { "id": 1, "name": "Si" }
]
);

const dataIdentificacion = ref([
  { "id": 1, "nombre": "Estándar de adopción del contribuyente" },
  { "id": 2, "nombre": "UNSPSC" },
  { "id": 3, "nombre": "Partida Arancelaria" },
  { "id": 4, "nombre": "GTIN" }
]
);

onMounted(() => {
  dataUnidadMedida.value = data.value?.data ?? [];
});

watch(isFetched, () => {
  dataUnidadMedida.value = data.value?.data ?? [];
})

onMounted(() => {
  dataTribute.value = datProduct.value?.data ?? [];
});

watch(isFetchedProduct, () => {
  dataTribute.value = datProduct.value?.data ?? [];
})
</script>
