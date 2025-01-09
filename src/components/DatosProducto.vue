<template>
  <div class="card">
    <Fieldset legend="Productos o Servicios">
      <div class="grid grid-cols-2 gap-5">
        <div class="flex flex-col space-y-2">
          <label for="codeReference">Código de Referencia</label>
          <InputText
            id="codeReference"
            v-model="code_reference"
            placeholder="Ingrese el código de referencia"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="name">Nombre del Producto</label>
          <InputText
            id="name"
            v-model="name"
            placeholder="Ingrese el nombre del producto o servicio"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="quantity">Cantidad</label>
          <InputText
            id="quantity"
            v-model="quantity"
            placeholder="Ingrese la cantidad"
            type="number"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="price">Precio</label>
          <InputText
            id="price"
            v-model="price"
            placeholder="Ingrese el precio"
            type="number"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="discountRate">Tasa de Descuento (%)</label>
          <InputText
            id="discountRate"
            v-model="discount_rate"
            placeholder="Ingrese la tasa de descuento"
            type="number"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="taxRate">Tasa de Impuesto (%)</label>
          <InputText
            id="taxRate"
            v-model="tax_rate"
            placeholder="Ingrese la tasa de impuesto"
            type="number"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="unitMeasureId">ID Unidad de Medida</label>
          <Select
            v-model="unit_measure_id"
            :options="dataUnidadMedida"
            optionLabel="name"
            placeholder="Ingrese el ID de la unidad de medida"
            class="w-full"
            filter
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="standardCodeId">ID Código de Estándar</label>
          <InputText
            id="standardCodeId"
            v-model="standard_code_id"
            placeholder="Ingrese el ID del código estándar"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="isExcluded">Excluido de IVA</label>
          <select id="isExcluded" v-model="is_excluded">
            <option :value="1">Sí</option>
            <option :value="0">No</option>
          </select>
        </div>
        <div class="flex flex-col space-y-2">
          <label for="tributeId">ID del Tributo</label>
          <InputText
            id="tributeId"
            v-model="tribute_id"
            placeholder="Ingrese el ID del tributo"
          />
        </div>
        <div class="card flex justify-center gap-2">
          <p>Retenciones</p>
          <ToggleSwitch v-model="withholdingEnabled" />
        </div>
        <div v-if="withholdingEnabled">
          <div class="col-span-2 flex flex-col space-y-2">
            <label for="withholdingCode">Retención - Código</label>
            <InputText
              id="withholdingCode"
              v-model="withholdingCode"
              placeholder="Ingrese el código de la retención"
            />
          </div>
          <div class="col-span-2 flex flex-col space-y-2">
            <label for="withholdingRate">Retención - Tasa (%)</label>
            <InputText
              id="withholdingRate"
              v-model="withholdingRate"
              placeholder="Ingrese la tasa de la retención"
              type="number"
            />
          </div>
        </div>
      </div>
    </Fieldset>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import unidadmedidaService from "../services/Factus/unidadmedida.service";
import type { Unidadmedida } from "../models/unidadmedida";

const code_reference = ref("");
const name = ref("");
const quantity = ref(0);
const price = ref(0);
const discount_rate = ref(0);
const tax_rate = ref(0);
const unit_measure_id = ref("");
const standard_code_id = ref("");
const is_excluded = ref(0);
const tribute_id = ref("");

const withholdingCode = ref("");
const withholdingRate = ref(0);

const withholdingEnabled = ref(false);


const dataUnidadMedida = ref<Unidadmedida[]>([])

const { data, isFetched } = unidadmedidaService.useListQuery();

onMounted(() => {
  dataUnidadMedida.value = data.value?.data ?? []; 
});

watch(isFetched, () => {
  dataUnidadMedida.value = data.value?.data ?? []; 
})
</script>
