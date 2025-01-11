<template>
  <div class="card">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 my-2">
      <div class="flex flex-col space-y-2 w-full">
        <label for="startDate">Fecha de Inicio</label>
        <Calendar 
          v-model="startDate" 
          showIcon 
          iconDisplay="input"
          :class="{ 'p-invalid': submitted && !startDate }"
        />
        <small class="text-red-500" v-if="submitted && !startDate">
          La fecha de inicio es requerida
        </small>
      </div>
      <div class="flex flex-col space-y-2 w-full">
        <label for="startTime">Hora de Inicio</label>
        <Calendar 
          id="calendar-timeonly" 
          v-model="startTime" 
          timeOnly 
        />
      </div>
      <div class="flex flex-col space-y-2 w-full">
        <label for="endDate">Fecha de Fin</label>
        <Calendar 
          v-model="endDate" 
          showIcon 
          iconDisplay="input"
          :class="{ 'p-invalid': submitted && !endDate }"
          :minDate="startDate"
        />
        <small class="text-red-500" v-if="submitted && !endDate">
          La fecha de fin es requerida
        </small>
        <small class="text-red-500" v-if="submitted && endDate && startDate && endDate < startDate">
          La fecha de fin debe ser posterior a la fecha de inicio
        </small>
      </div>
      <div class="flex flex-col space-y-2 w-full">
        <label for="endTime">Hora de Fin</label>
        <Calendar 
          id="calendar-timeonly" 
          v-model="endTime" 
          timeOnly 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

const startDate = ref<Date>();
const startTime = ref<Date>();
const endDate = ref<Date>();
const endTime = ref<Date>();
const submitted = ref(false);

const emit = defineEmits(["addFacturacion", "validationChange"]);

const isValid = computed(() => {
  if (!startDate.value || !endDate.value) {
    return false;
  }

  if (endDate.value < startDate.value) {
    return false;
  }

  return true;
});

watch(
  [startDate, startTime, endDate, endTime],
  () => {
    submitted.value = true;
    emit("validationChange", isValid.value);
  }
);
</script>