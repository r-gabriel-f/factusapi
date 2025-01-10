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
import { ref } from "vue";

const startDate = ref<Date>();
const startTime = ref<Date>();
const endDate = ref<Date>();
const endTime = ref<Date>();
</script>
