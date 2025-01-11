<template>
  <div class="card mx-5">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      <div class="flex flex-col space-y-2">
        <label for="codeReference">Código de Referencia *</label>
        <InputText
          id="codeReference"
          v-model="code_reference"
          placeholder="Ingrese el código de referencia"
          :class="{
            'p-invalid': (showValidation || submitted) && !code_reference,
          }"
        />
        <small
          class="text-red-500"
          v-if="(showValidation || submitted) && !code_reference"
        >
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="name">Nombre del Producto *</label>
        <InputText
          id="name"
          v-model="name"
          placeholder="Ingrese el nombre del producto o servicio"
          :class="{ 'p-invalid': (showValidation || submitted) && !name }"
        />
        <small
          class="text-red-500"
          v-if="(showValidation || submitted) && !name"
        >
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="quantity">Cantidad *</label>
        <InputNumber
          v-model="quantity"
          inputId="quantity"
          fluid
          :class="{ 'p-invalid': (showValidation || submitted) && !quantity }"
        />
        <small
          class="text-red-500"
          v-if="(showValidation || submitted) && !quantity"
        >
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="price">Precio *</label>
        <InputNumber
          v-model="price"
          inputId="price"
          fluid
          :class="{ 'p-invalid': (showValidation || submitted) && !price }"
        />
        <small
          class="text-red-500"
          v-if="(showValidation || submitted) && !price"
        >
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="discountRate">Tasa de Descuento (%)</label>
        <InputNumber v-model="discount_rate" inputId="discountRate" fluid />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="taxRate">Tasa de Impuesto (%)</label>
        <InputNumber v-model="tax_rate" inputId="taxRate" fluid />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="unitMeasureId">ID Unidad de Medida *</label>
        <Select
          v-model="unit_measure_id"
          :options="dataUnidadMedida"
          optionLabel="name"
          optionValue="id"
          placeholder="Seleccione la unidad de medida"
          class="min-w-full"
          filter
          :class="{
            'p-invalid': (showValidation || submitted) && !unit_measure_id,
          }"
        />
        <small
          class="text-red-500"
          v-if="(showValidation || submitted) && !unit_measure_id"
        >
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="standardCodeId">ID Código de Estándar *</label>
        <Select
          v-model="standard_code_id"
          :options="dataIdentificacion"
          optionLabel="nombre"
          optionValue="id"
          placeholder="Seleccione el código estándar"
          class="min-w-full"
          filter
          :class="{
            'p-invalid': (showValidation || submitted) && !standard_code_id,
          }"
        />
        <small
          class="text-red-500"
          v-if="(showValidation || submitted) && !standard_code_id"
        >
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="isExcluded">Excluido de IVA *</label>
        <Select
          v-model="is_excluded"
          :options="dataIva"
          optionLabel="name"
          optionValue="id"
          placeholder="Seleccione si está excluido"
          class="min-w-full"
          :class="{
            'p-invalid': (showValidation || submitted) && is_excluded === null,
          }"
        />
        <small
          class="text-red-500"
          v-if="(showValidation || submitted) && is_excluded === null"
        >
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="tributeId">ID del Tributo *</label>
        <Select
          v-model="tribute_id"
          :options="dataTribute"
          optionLabel="name"
          optionValue="id"
          placeholder="Seleccione el tributo"
          class="min-w-full"
          filter
          :class="{ 'p-invalid': (showValidation || submitted) && !tribute_id }"
        />
        <small
          class="text-red-500"
          v-if="(showValidation || submitted) && !tribute_id"
        >
          Este campo es requerido
        </small>
      </div>
    </div>
    <div class="my-5">
      <div class="card flex justify-center gap-2">
        <p>Retenciones</p>
        <ToggleSwitch v-model="withholdingEnabled" :disabled="is_excluded=== 1"/>
      </div>
      <div v-if="withholdingEnabled">
        <Button
          label="Agregar Retención"
          icon="pi pi-plus"
          @click="addRetention"
        />

        <div v-for="(retention, index) in retentions" :key="index" class="mt-4">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-5">
            <div class="col-span-2 sm:col-span-2 flex flex-col space-y-2">
              <label :for="'withholdingCode' + index">Retención - Código *</label>
              <Select
                :id="'withholdingCode' + index"
                v-model="retention.code"
                :options="dataTribute"
                optionLabel="code"
                optionValue="code"
                placeholder="Seleccione el código de retención"
                class="min-w-full"
                filter
                :class="{
                  'p-invalid':
                    (showValidation || submitted) &&
                    withholdingEnabled &&
                    !retention.code,
                }"
                @change="handleSelectChange(index, $event)"
              />
              <small
                class="text-red-500"
                v-if="(showValidation || submitted) && withholdingEnabled && !retention.code"
              >
                Este campo es requerido cuando se aplican retenciones
              </small>
            </div>
            <div class="col-span-2 sm:col-span-2 flex flex-col space-y-2">
              <label :for="'withholdingRate' + index">Retención - Tasa (%) *</label>
              <InputText
                :id="'withholdingRate' + index"
                v-model="retention.withholding_tax_rate"
                placeholder="Ingrese la tasa de retención"
                type="text"
                :class="{
                  'p-invalid':
                    (showValidation || submitted) &&
                    withholdingEnabled &&
                    !retention.withholding_tax_rate,
                }"
              />
              <small
                class="text-red-500"
                v-if="(showValidation || submitted) && withholdingEnabled && !retention.withholding_tax_rate"
              >
                Este campo es requerido cuando se aplican retenciones
              </small>
            </div>
          </div>
          <Button
            icon="pi pi-trash"
            class="p-button-danger mt-2"
            @click="removeRetention(index)"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <Button
        label="Agregar Producto"
        icon="pi pi-plus"
        @click="validateAndAddProduct"
        :disabled="!isValid"
        :class="{ 'p-button-disabled': !isValid }"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import unidadmedidaService from "../../services/Factus/unidadmedida.service";
import productsService from "../../services/Factus/atributes.service";
import type { Unidadmedida } from "../../models/unidadmedida";
import type { Product } from "../../models/product";

const code_reference = ref("");
const name = ref("");
const quantity = ref<number>(0);
const price = ref<number>(0);
const discount_rate = ref<number>(0);
const tax_rate = ref("");
const unit_measure_id = ref("");
const standard_code_id = ref("");
const is_excluded = ref<number | null>(null);
const tribute_id = ref("");
const submitted = ref(false);
const showValidation = ref(false);

const withholdingEnabled = ref(false);

interface Retention {
  code: string;
  withholding_tax_rate: string;
}

const retentions = ref<Retention[]>([]);
const isValid = computed(() => {
  const requiredFieldsValid =
    code_reference.value?.trim() !== "" &&
    name.value?.trim() !== "" &&
    quantity.value > 0 &&
    price.value > 0 &&
    unit_measure_id.value !== "" &&
    is_excluded.value !== null &&
    standard_code_id.value !== "" &&
    tribute_id.value !== "";

  if (withholdingEnabled.value && retentions.value.length > 0) {
    const retentionsValid = retentions.value.every(
      (retention) =>
        retention.code?.trim() !== "" &&
        retention.withholding_tax_rate?.trim() !== ""
    );
    return requiredFieldsValid && retentionsValid;
  }

  return requiredFieldsValid;
});

const startValidation = () => {
  showValidation.value = true;
};

const handleSelectChange = (index: number, event: any) => {
  const selectedCode = event.value;
  retentions.value[index].code = selectedCode;
};

const addRetention = () => {
  retentions.value.push({
    code: "",
    withholding_tax_rate: "",
  });
};

const removeRetention = (index: number) => {
  retentions.value.splice(index, 1);
};

const items = ref<any>([]);
const emit = defineEmits(["addProduct"]);

const validateAndAddProduct = () => {
  submitted.value = true;
  if (isValid.value) {
    addProduct();
  }
};

const addProduct = () => {
  const productData = {
    code_reference: code_reference.value,
    name: name.value,
    quantity: quantity.value,
    price: price.value,
    discount_rate: discount_rate.value,
    tax_rate: tax_rate.value ? parseFloat(tax_rate.value).toFixed(2) : "0.00",
    unit_measure_id: unit_measure_id.value,
    standard_code_id: standard_code_id.value || null,
    is_excluded: is_excluded.value,
    tribute_id: tribute_id.value,
    withholding_taxes: withholdingEnabled.value ? retentions.value : [],
  };

  items.value.push(productData);
  emit("addProduct", items.value);
  resetForm();
};

const resetForm = () => {
  code_reference.value = "";
  name.value = "";
  quantity.value = 0;
  price.value = 0;
  discount_rate.value = 0;
  tax_rate.value = "";
  unit_measure_id.value = "";
  standard_code_id.value = "";
  is_excluded.value = null;
  tribute_id.value = "";
  withholdingEnabled.value = false;
  retentions.value = [];
  submitted.value = false;
  showValidation.value = false;
};

const dataUnidadMedida = ref<Unidadmedida[]>([]);
const dataTribute = ref<Product[]>([]);

const { data, isFetching } = unidadmedidaService.useListQuery();
const { data: datProduct, isFetching: isFetchedProduct } =
  productsService.useListQuery();

const dataIva = ref([
  { id: 0, name: "No" },
  { id: 1, name: "Si" },
]);

const dataIdentificacion = ref([
  { id: 1, nombre: "Estándar de adopción del contribuyente" },
  { id: 2, nombre: "UNSPSC" },
  { id: 3, nombre: "Partida Arancelaria" },
  { id: 4, nombre: "GTIN" },
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

watch(isFetching, () => {
  dataUnidadMedida.value = data.value?.data ?? [];
});

watch(isFetchedProduct, () => {
  dataTribute.value = datProduct.value?.data ?? [];
});

watch(
  [
    code_reference,
    name,
    quantity,
    price,
    tax_rate,
    unit_measure_id,
    standard_code_id,
    is_excluded,
    tribute_id,
    retentions,
    withholdingEnabled,
  ],
  () => {
    if (!showValidation.value) {
      startValidation();
    }
  },
  { deep: true }
);
</script>
