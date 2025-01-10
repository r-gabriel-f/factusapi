<template>
  <div class="card mx-5">
    <div class="grid grid-cols-5 gap-5">
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
        <Select v-model="unit_measure_id" :options="dataUnidadMedida" optionLabel="name" optionValue="id"
          placeholder="Ingrese el ID de la unidad de medida" class="w-full" filter />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="standardCodeId">ID Código de Estándar</label>
        <Select v-model="standard_code_id" :options="dataIdentificacion" optionLabel="nombre" optionValue="id"
          placeholder="Ingrese el ID del código estándar" class="w-full" filter />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="isExcluded">Excluido de IVA</label>
        <Select v-model="is_excluded" :options="dataIva" optionLabel="name" optionValue="id"
          placeholder="Ingrese el ID del IVA" class="w-full" />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="tributeId">ID del Tributo</label>
        <Select v-model="tribute_id" :options="dataTribute" optionLabel="name" optionValue="id"
          placeholder="Ingrese el ID del tributo" class="w-full" filter />
      </div>
    </div>
    <div class="my-5">
      <div class="card flex justify-center gap-2">
        <p>Retenciones</p>
        <ToggleSwitch v-model="withholdingEnabled" />
      </div>
      <div v-if="withholdingEnabled">
        <Button label="Agregar Retención" icon="pi pi-plus" @click="addRetention" />

        <div v-for="(retention, index) in retentions" :key="index" class="mt-4">
          <div class="grid grid-cols-4 gap-5">
            <div class="col-span-2 flex flex-col space-y-2">
              <label :for="'withholdingCode' + index">Retención - Código</label>
              <Select :id="'withholdingCode' + index" v-model="retention.code" :options="dataTribute" optionLabel="code"
                optionValue="code" placeholder="Ingrese el código de la retención" class="w-full" filter
                @change="handleSelectChange(index, $event)" />
            </div>
            <div class="col-span-2 flex flex-col space-y-2">
              <label :for="'withholdingRate' + index">Retención - Tasa (%)</label>
              <InputText :id="'withholdingRate' + index" v-model="retention.rate"
                placeholder="Ingrese la tasa de la retención" type="text" />
            </div>
          </div>
          <Button icon="pi pi-trash" class="p-button-danger mt-2" @click="removeRetention(index)" />
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <Button label="Agregar Producto" icon="pi pi-plus" @click="addProduct" />
    </div>
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

const withholdingEnabled = ref(false);

interface Retention {
  code: string;
  rate: string;
}

const retentions = ref<Retention[]>([]);

const handleSelectChange = (index: number, event: any) => {
  const selectedCode = event.value;
  retentions.value[index].code = selectedCode;
};

const addRetention = () => {
  retentions.value.push({
    code: "",
    rate: ""
  });
};

const removeRetention = (index: number) => {
  retentions.value.splice(index, 1);
};
const items = ref<any>([]);
const addProduct = () => {
  const productData = {
    code_reference: code_reference.value,
    name: name.value,
    quantity: quantity.value,
    price: price.value,
    discount_rate: discount_rate.value,
    tax_rate: tax_rate.value,
    unit_measure_id: unit_measure_id.value,
    standard_code_id: standard_code_id.value,
    is_excluded: is_excluded.value,
    tribute_id: tribute_id.value,
    withholding_taxes: withholdingEnabled.value ? retentions.value : []
  };
  items.value.push(productData);
  resetForm();
};


const resetForm = () => {
  code_reference.value = "";
  name.value = "";
  quantity.value = "";
  price.value = "";
  discount_rate.value = "";
  tax_rate.value = "";
  unit_measure_id.value = "";
  standard_code_id.value = "";
  is_excluded.value = 0;
  tribute_id.value = "";
  withholdingEnabled.value = false;
  retentions.value = [];
};

const dataUnidadMedida = ref<Unidadmedida[]>([]);
const dataTribute = ref<Product[]>([]);

const { data, isFetched } = unidadmedidaService.useListQuery();
const { data: datProduct, isFetched: isFetchedProduct } = productsService.useListQuery();

const dataIva = ref([
  { "id": 0, "name": "No" },
  { "id": 1, "name": "Si" }
]);

const dataIdentificacion = ref([
  { "id": 1, "nombre": "Estándar de adopción del contribuyente" },
  { "id": 2, "nombre": "UNSPSC" },
  { "id": 3, "nombre": "Partida Arancelaria" },
  { "id": 4, "nombre": "GTIN" }
]);

watch(withholdingEnabled, () => {
  if (!withholdingEnabled.value) {
    retentions.value = [];
  }
});

onMounted(() => {
  dataUnidadMedida.value = data.value?.data ?? [];
  dataTribute.value = datProduct.value?.data ?? [];
});

watch(isFetched, () => {
  dataUnidadMedida.value = data.value?.data ?? [];
});

watch(isFetchedProduct, () => {
  dataTribute.value = datProduct.value?.data ?? [];
});
</script>