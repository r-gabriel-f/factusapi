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
import { formatDate, formatToEndOfDay } from "../../constants/externo";

const startDate = ref<Date>();
const startTime = ref<Date>();
const endDate = ref<Date>();
const endTime = ref<Date>();

const emit = defineEmits(["addFacturacion"]);

const emitFacturacion = () => {
  const faturacion = {
    start_date: formatDate(startDate.value as Date),
    start_time: formatToEndOfDay(startTime.value as Date),
    end_date: formatDate(endDate.value as Date),
    end_time: formatToEndOfDay(endTime.value as Date),
    
  };
  emit("addFacturacion", faturacion);
};

watch([startDate, startTime, endDate, endTime], () => {
  emitFacturacion();
});
</script>
