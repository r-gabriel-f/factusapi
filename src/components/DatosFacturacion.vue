<template>
  <div class="card">
      <div class="grid grid-cols-2 gap-5">
        <div class="col-12 flex flex-col space-y-2">
          <label for="startDate">Fecha de Inicio</label>
          <Calendar v-model="startDate" showIcon iconDisplay="input" />
        </div>
        <div class="col-12 flex flex-col space-y-2">
          <label for="startTime">Hora de Inicio</label>
          <Calendar id="calendar-timeonly" v-model="startTime" timeOnly />
        </div>
        <div class="col-12 flex flex-col space-y-2">
          <label for="endDate">Fecha de Fin</label>
          <Calendar v-model="endDate" showIcon iconDisplay="input" />
        </div>
        <div class="col-12 flex flex-col space-y-2">
          <label for="endTime">Hora de Fin</label>
          <Calendar id="calendar-timeonly" v-model="endTime" timeOnly />
        </div>
      </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { formatDate, formatToEndOfDay } from "../assets/externo";

const startDate = ref<Date>();
const startTime = ref<Date>();
const endDate = ref<Date>();
const endTime = ref<Date>();

const emit = defineEmits(["addFacturacion"]);

const emitFacturacion = () => {
  const faturacion = {
    startDate: formatDate(startDate.value as Date),
    startTime: formatToEndOfDay(startTime.value as Date),
    endDate: formatDate(endDate.value as Date),
    endTime: formatToEndOfDay(endTime.value as Date),
    
  };
  console.log(faturacion);
  emit("addFacturacion", faturacion);
};

watch([startDate, startTime, endDate, endTime], () => {
  emitFacturacion();
});
</script>
