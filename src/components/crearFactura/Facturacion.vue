<template>
  <div>
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-6">Facturación</h1>
    </div>
    <div class="card flex justify-center w-full">
      <Stepper value="1" class="w-full">
        <StepList>
          <Step value="1">Datos Generales de la Factura</Step>
          <Step value="2">Periodo de Facturación</Step>
          <Step value="3">Información del Cliente</Step>
          <Step value="4">Datos del Producto</Step>
        </StepList>
        <StepPanels>
          <StepPanel v-slot="{ activateCallback }" value="1">
            <div class="flex flex-col h-[700px] items-center justify-center">
              <div
                class="w-full border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                <DatosGenerales @submitData="addDatageneral"/>
              </div>
              <div class="flex pt-6 justify-end w-full">
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  @click="activateCallback('2')"
                />
              </div>
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="2">
            <div class="flex flex-col h-[700px] items-center justify-center">
              <div
                class="w-full border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                <DatosFacturacion @addFacturacion="addFacturacion" />
              </div>
              <div class="flex pt-6 justify-between w-full">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  @click="activateCallback('1')"
                />
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  @click="activateCallback('3')"
                />
              </div>
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="3">
            <div class="flex flex-col h-[700px] items-center justify-center">
              <div
                class="w-full border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                <DatosCliente @addCliente="addCliente" />
              </div>
              <div class="flex pt-6 justify-between w-full">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  @click="activateCallback('2')"
                />
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  @click="activateCallback('4')"
                />
              </div>
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="4">
            <div class="flex flex-col h-[700px] items-center justify-center">
              <div
                class="w-full border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                <DatosProducto />
              </div>
              <div class="flex pt-6 justify-between w-full">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  @click="activateCallback('3')"
                />
              </div>
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </div>
  </div>
</template>


<script setup lang="ts">
import DatosGenerales from "./DatosGenerales.vue";
import DatosFacturacion from "./DatosFacturacion.vue";
import DatosProducto from "./DatosProducto.vue";
import DatosCliente from "./DatosCliente.vue";
import Navbar from "../Navbar.vue";

const addDatageneral = (data: any) => {
  console.log(data);
};
const addCliente = (data: any) => {
  console.log(data);
};
const addFacturacion = (data: any) => {
  console.log(data);
};
</script>
