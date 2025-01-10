<template>
  <div class="card flex justify-center">
    <Toast />
    <Dialog
      v-model:visible="visible"
      modal
      header="Validar Factura"
      :style="{ width: '25rem' }"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Estas seguro de validar la factura {{ props.number }}</span
      >
      <div class="flex justify-center gap-2">
        <Button type="button" label="Validar" @click="validate" />
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import facturasService from "../../services/Factus/facturas.service";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const visible = defineModel<boolean>("visible");
const emit = defineEmits(["validated"]);
interface Props {
  number: string;
}
const props = defineProps<Props>();

const { mutateAsync } = facturasService.useValidate();

async function validate() {
  try {
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
  }
}
</script>
