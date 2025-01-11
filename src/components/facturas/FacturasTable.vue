<template>
  <div class="m-5">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-6">Facturas Registradas</h1>
    </div>
    <Toast />
    <div class="card">
      <DataTable
        v-model:filters="filters"
        :value="dataVaules"
        dataKey="id"
        filterDisplay="row"
        :loading="isLoading"
        responsiveLayout="scroll"
        scrollable
        scrollHeight="900px"
      >
        <template #empty> No se encontraron facturas. </template>
        <template #loading>
          Cargando datos de facturas. Por favor espere.
        </template>

        <Column field="id" header="ID" style="min-width: 8rem">
          <template #body="{ data }">
            {{ data.id }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="w-full"
              placeholder="Buscar por ID"
            />
          </template>
        </Column>

        <Column field="number" header="Número" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.number }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="w-full"
              placeholder="Buscar por número"
            />
          </template>
        </Column>

        <Column field="names" header="Cliente" style="min-width: 14rem">
          <template #body="{ data }">
            {{ data.names }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="w-full"
              placeholder="Buscar por cliente"
            />
          </template>
        </Column>

        <Column
          field="identification"
          header="Identificación"
          style="min-width: 10rem"
        >
          <template #body="{ data }">
            {{ data.identification }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="w-full"
              placeholder="Buscar por identificación"
            />
          </template>
        </Column>

        <Column field="total" header="Total" style="min-width: 10rem">
          <template #body="{ data }">
            {{ data.total }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="w-full"
              placeholder="Buscar por total"
            />
          </template>
        </Column>

        <Column
          field="created_at"
          header="Fecha"
          style="min-width: 12rem"
          sortable
        >
          <template #body="{ data }">
            {{ data.created_at }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Calendar
              v-model="filterModel.value"
              dateFormat="dd/mm/yy"
              placeholder="Buscar por fecha"
              class="w-full"
              @date-select="filterCallback()"
            />
          </template>
        </Column>
        <Column field="status" header="Estado" style="min-width: 10rem">
          <template #body="{ data }">
            <div v-if="data.status === 0">
              <Button
                label="Validar Factura"
                severity="info"
                class="w-full"
                @click="validarFactura(data.number)"
              />
            </div>
            <div v-else>
        <div class="flex justify-center">
          <Button
            type="button"
            label="Factura"
            @click="toggle($event, data.number)" 
            aria-haspopup="true"
            aria-controls="overlay_menu"
            class="w-full"
          />
          <Menu
            ref="menu"
            id="overlay_menu"
            :model="getMenuItems(data.number)" 
            :popup="true"
          />
        </div>
      </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <DialogValidar
    v-model:visible="visible"
    :number="numberOrder ?? ''"
    @validated="refetchData"
  />
  <Dialog
    v-model:visible="pdfDialogVisible"
    modal
    :style="{ width: '90vw', height: '90vh' }"
    :maximizable="true"
  >
    <template #header>
      <h2>Vista de Factura</h2>
    </template>
    <iframe
      v-if="pdfUrl"
      :src="pdfUrl"
      style="width: 100%; height: 90vh; border: none"
    ></iframe>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { Datum, Facturas, Verfactura } from "../../models/facturas";
import facturasService from "../../services/Factus/facturas.service";
import { FilterMatchMode } from "@primevue/core/api";
import DialogValidar from "./DialogValidar.vue";
import type { Dian } from "../../models/dian";
import { useToast } from "primevue";
const toast = useToast();
const dataFacturas = ref<Facturas>();
const dataVaules = ref<Datum[]>([]);
const visible = ref(false);
const dataFactu = ref<Verfactura>();

const { data, isFetching, isLoading, refetch } = facturasService.useListQuery();

const pdfDialogVisible = ref(false);
const pdfUrl = ref<string | null>(null);

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  number: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  names: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  identification: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  total: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

  created_at: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
const numberOrder = ref<string | null>(null);

const validarFactura = (number: string) => {
  numberOrder.value = number;
  visible.value = true;
};
const options = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  retryOnMount: false,
  enabled: false,
};

const {
  data: dataVer,
  isFetching: isFetchedVer,
  refetch: refetchVer,
} = facturasService.useVerFactura(numberOrder, options);

const verFactura = async (numero: string) => {
  try {
    numberOrder.value = numero;
    options.enabled = true;
    await refetchVer();

    const base64Data = dataFactu?.value?.pdf_base_64_encoded;
    if (base64Data) {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      pdfUrl.value = URL.createObjectURL(blob);
      pdfDialogVisible.value = true;
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    })
  }
};

const optionsDian = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  retryOnMount: false,
  enabled: false,
};
const infoDian = ref<Dian>();

const {
  data: dataDian,
  isFetching: isFetchedDian,
  refetch: refetchDian,
} = facturasService.useDianSowh(numberOrder, optionsDian);

const verDian = async (numero: string) => {
  try {
    numberOrder.value = numero;
    optionsDian.enabled = true;
    await refetchDian();
    const dianswoh = infoDian?.value?.bill?.qr;

    window.open(dianswoh, "_blank");
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    })
  }
};
const descargarFactura = async (numero: string) => {
  try {
    numberOrder.value = numero;
    options.enabled = true;
    await refetchVer();

    const base64Data = dataFactu?.value?.pdf_base_64_encoded;
    if (base64Data) {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${dataFactu?.value?.file_name}.pdf`;
      link.click();
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    })
  }
};

const menu = ref();
const getMenuItems = (number: string) => {
  return [{
    items: [
      {
        label: "Ver Factura",
        icon: "pi pi-book",
        command: () => verFactura(number),
      },
      {
        label: "Ver Dian",
        icon: "pi pi-link",
        command: () => verDian(number),
      },
      {
        label: "Descargar Factura",
        icon: "pi pi-download",
        command: () => descargarFactura(number),
      },
    ],
  }];
};

const toggle = (event: Event, number: string) => {
  numberOrder.value = number;
  menu.value.toggle(event);
};

const refetchData = () => {
  refetch();
};

onMounted(() => {
  dataFacturas.value = data.value?.data as Facturas;
  dataVaules.value = dataFacturas?.value?.data ?? [];
});

watch(isFetching, () => {
  dataFacturas.value = data.value?.data as Facturas;
  dataVaules.value = dataFacturas?.value?.data ?? [];
});


onMounted(() => {
  dataFactu.value = dataVer.value?.data;
});

watch(isFetchedVer, () => {
  dataFactu.value = dataVer.value?.data;
});

onMounted(() => {
  infoDian.value = dataDian.value?.data;
});

watch(isFetchedDian, () => {
  infoDian.value = dataDian.value?.data;
});
</script>
