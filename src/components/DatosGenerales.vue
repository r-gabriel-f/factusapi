<template>
  <div class="card">
    <Fieldset legend="Datos Generales de la Factura">
      <div class="grid grid-cols-3 gap-5">
        <div class="col-12 md:col-6 flex flex-col space-y-2 w-full">
          <label for="numberingRange">Rango de Numeración</label>
          <Select
            v-model="numberingRange"
            :options="dataRango"
            optionLabel="document"
            placeholder="Seleccione un rango"
            class="w-full"
            filter
          />
        </div>
        <div class="col-12 md:col-6 flex flex-col space-y-2">
          <label for="referenceCode">Código de Referencia</label>
          <InputText
            id="referenceCode"
            v-model="referenceCode"
            placeholder="Ingrese el código de referencia"
          />
        </div>
        <div class="col-12 md:col-6 flex flex-col space-y-2">
          <label for="observation">Observación</label>
          <InputText
            id="observation"
            v-model="observation"
            placeholder="Ingrese una observación"
          />
        </div>
        <div class="col-12 md:col-6 flex flex-col space-y-2">
          <label for="paymentForm">Forma de Pago</label>
          <InputText
            id="paymentForm"
            v-model="paymentForm"
            placeholder="Ingrese la forma de pago"
          />
        </div>
        <div class="col-12 md:col-6 flex flex-col space-y-2">
          <label for="paymentDueDate">Fecha de Vencimiento</label>
          <Calendar v-model="paymentDueDate" showIcon iconDisplay="input" />
        </div>
        <div class="col-12 md:col-6 flex flex-col space-y-2 w-full">
          <label for="paymentMethod">Método de Pago</label>
          <Select
            v-model="paymentMethod"
            :options="mediosDePago"
            optionLabel="nombre"
            placeholder="Seleccione un medio de pago"
            class="w-full"
            filter
          />
        </div>
      </div>
    </Fieldset>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import rangosdenumeracionService from "../services/Factus/rangosdenumeracion.service";
import type { Rangosdenumeracion } from "../models/rangosdenumeracion";

const numberingRange = ref("");
const referenceCode = ref("");
const observation = ref("");
const paymentForm = ref("");
const paymentDueDate = ref("");
const paymentMethod = ref("");

const dataRango = ref<Rangosdenumeracion[]>([]);

const { data, isFetched } = rangosdenumeracionService.useListQuery();

const mediosDePago = [
  { id: 10, nombre: "Efectivo" },
  { id: 42, nombre: "Consignación" },
  { id: 20, nombre: "Cheque" },
  { id: 47, nombre: "Transferencia" },
  { id: 71, nombre: "Bonos" },
  { id: 72, nombre: "Vales" },
  { id: 1, nombre: "Medio de pago no definido" },
  { id: 49, nombre: "Tarjeta Débito" },
  { id: 48, nombre: "Tarjeta Crédito" },
  { id: "ZZZ", nombre: "Otro*" },
];

onMounted(() => {
  dataRango.value = data.value?.data ?? [];
});
watch(isFetched, () => {
  dataRango.value = data.value?.data ?? [];
});
</script>
