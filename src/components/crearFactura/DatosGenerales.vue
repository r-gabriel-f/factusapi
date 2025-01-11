<template>
  <div class="card">
    <div class="grid grid-cols-3 gap-5">
      <div class="col-12 md:col-6 flex flex-col space-y-2 w-full">
        <label for="numberingRange">
          Rango de Numeración {{ dataRango.length > 1 ? '*' : '' }}
        </label>
        <Select
          v-model="numberingRange"
          :options="dataRango"
          optionLabel="document"
          optionValue="id"
          placeholder="Seleccione un rango"
          class="min-w-full"
          filter
          :class="{ 'p-invalid': submitted && isNumberingRangeRequired && !numberingRange }"
        />
        <small 
          class="text-red-500" 
          v-if="submitted && isNumberingRangeRequired && !numberingRange"
        >
          Este campo es requerido cuando hay múltiples rangos activos
        </small>
      </div>
      <div class="col-12 md:col-6 flex flex-col space-y-2">
        <label for="referenceCode">Código de Referencia *</label>
        <InputText
          id="referenceCode"
          v-model="referenceCode"
          placeholder="Ingrese el código de referencia"
          :class="{ 'p-invalid': submitted && !referenceCode }"
        />
        <small class="text-red-500" v-if="submitted && !referenceCode">
          Este campo es requerido
        </small>
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
        <Select
          v-model="paymentForm"
          :options="formasDePago"
          optionLabel="nombre"
          optionValue="id"
          placeholder="Seleccione forma de pago"
          class="min-w-full"
        />
      </div>
      <div class="col-12 md:col-6 flex flex-col space-y-2">
        <label for="paymentDueDate">
          Fecha de Vencimiento {{ isPaymentDueDateRequired ? '*' : '' }}
        </label>
        <Calendar 
          v-model="paymentDueDate" 
          showIcon 
          iconDisplay="input"
          :class="{ 'p-invalid': submitted && isPaymentDueDateRequired && !paymentDueDate }"
        />
        <small 
          class="text-red-500" 
          v-if="submitted && isPaymentDueDateRequired && !paymentDueDate"
        >
          Este campo es requerido para pagos a crédito
        </small>
      </div>
      <div class="col-12 md:col-6 flex flex-col space-y-2 w-full">
        <label for="paymentMethod">Método de Pago</label>
        <Select
          v-model="paymentMethod"
          :options="mediosDePago"
          optionLabel="nombre"
          optionValue="id"
          placeholder="Seleccione un medio de pago"
          class="min-w-full"
          filter
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import rangosdenumeracionService from "../../services/Factus/rangosdenumeracion.service";
import type { Rangosdenumeracion } from "../../models/rangosdenumeracion";
import { formatDate } from "../../constants/externo";

const numberingRange = ref<number>();
const referenceCode = ref('');
const observation = ref('');
const paymentForm = ref('1');
const paymentDueDate = ref<Date>();
const paymentMethod = ref('10');
const submitted = ref(false);

const dataRango = ref<Rangosdenumeracion[]>([]);

const { data, isFetching } = rangosdenumeracionService.useListQuery();

const formasDePago = [
  { id: '1', nombre: "Contado" },
  { id: '2', nombre: "Crédito" }
];

const mediosDePago = [
  { id: '10', nombre: "Efectivo" },
  { id: '42', nombre: "Consignación" },
  { id: '20', nombre: "Cheque" },
  { id: '47', nombre: "Transferencia" },
  { id: '71', nombre: "Bonos" },
  { id: '72', nombre: "Vales" },
  { id: '1', nombre: "Medio de pago no definido" },
  { id: '49', nombre: "Tarjeta Débito" },
  { id: '48', nombre: "Tarjeta Crédito" },
  { id: "ZZZ", nombre: "Otro*" },
];

const emit = defineEmits(["submitData", "validationChange"]);

const isNumberingRangeRequired = computed(() => {
  return dataRango.value.length > 1;
});

const isPaymentDueDateRequired = computed(() => {
  return paymentForm.value === '2';
});

const isValid = computed(() => {
  const numberingRangeValid = !isNumberingRangeRequired.value || numberingRange.value;
  const paymentDueDateValid = !isPaymentDueDateRequired.value || paymentDueDate.value;
  
  return !!(
    numberingRangeValid &&
    referenceCode.value &&
    paymentDueDateValid
  );
});

const addDatageneral = () => {
  submitted.value = true;
  
  const dataGeneral = {
    numbering_range_id: numberingRange.value || (dataRango.value[0]?.id ?? ''),
    reference_code: referenceCode.value,
    observation: observation.value,
    payment_form: paymentForm.value,
    payment_due_date: paymentDueDate.value ? formatDate(paymentDueDate.value) : formatDate(new Date()),
    payment_method_code: paymentMethod.value.toString(),
  };
  
  emit("submitData", dataGeneral);
  emit("validationChange", isValid.value);
};

onMounted(() => {
  dataRango.value = data.value?.data ?? [];
  if (dataRango.value.length === 1) {
    numberingRange.value = dataRango.value[0].id;
  }
});

watch(isFetching, () => {
  dataRango.value = data.value?.data ?? [];
  if (dataRango.value.length === 1) {
    numberingRange.value = dataRango.value[0].id;
  }
});

watch(
  [numberingRange, referenceCode, observation, paymentForm, paymentDueDate, paymentMethod],
  () => {
    addDatageneral();
  }
);
</script>