<template>
  <div class="card flex justify-center">
    <Toast />
    <Dialog
      v-model:visible="visible"
      modal
      header="Validar Factura"
      :style="{ width: '25rem' }"
      :closable="!isValidating"
    >
      <div class="relative">
        <div :class="{ 'opacity-50': isValidating }">
          <span class="text-surface-500 dark:text-surface-400 block mb-8"
            >Estas seguro de validar la factura {{ props.number }}</span
          >
          <div class="flex justify-center gap-2">
            <Button 
              type="button" 
              label="Validar" 
              @click="validate"
              :disabled="isValidating"
            />
            <Button
              type="button"
              label="Cancel"
              severity="secondary"
              @click="visible = false"
              :disabled="isValidating"
            />
          </div>
        </div>
        
        <div v-if="isValidating" 
             class="absolute inset-0 flex items-center justify-center">
          <ProgressSpinner style="width: 50px; height: 50px" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import facturasService from "../../services/Factus/facturas.service";
import { useToast } from "primevue/usetoast";
import { ref } from 'vue';

const toast = useToast();
const visible = defineModel<boolean>("visible");
const emit = defineEmits(["validated"]);
const isValidating = ref(false);

interface Props {
  number: string;
}
const props = defineProps<Props>();

const { mutateAsync } = facturasService.useValidate();

async function validate() {
  try {
    isValidating.value = true;
    await mutateAsync(props.number);
    toast.add({
      severity: "success",
      summary: "Factura Validada",
      detail: props.number,
      life: 3000,
    });
    visible.value = false;
    emit("validated");
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
  } finally {
    isValidating.value = false;
  }
}
</script>