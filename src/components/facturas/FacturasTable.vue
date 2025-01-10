<template>
  <div>
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-6">Facturas Registradas</h1>
    </div>

    <div class="card">
      <DataTable
        v-model:filters="filters"
        :value="dataVaules"
        dataKey="id"
        filterDisplay="row"
        :loading="isLoading"
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
            {{ data.status }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { Datum, Facturas } from "../../models/facturas";
import facturasService from "../../services/Factus/facturas.service";
import { FilterMatchMode } from "@primevue/core/api";

const dataFacturas = ref<Facturas>();
const dataVaules = ref<Datum[]>([]);

const { data, isFetched, isLoading } = facturasService.useListQuery();

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.STARTS_WITH  },
  number: { value: null, matchMode: FilterMatchMode.STARTS_WITH  },
  names: { value: null, matchMode: FilterMatchMode.STARTS_WITH  },
  identification: { value: null, matchMode: FilterMatchMode.STARTS_WITH  },
  total: { value: null, matchMode: FilterMatchMode.STARTS_WITH  },

  created_at: { value: null, matchMode: FilterMatchMode.STARTS_WITH  },
  status: { value: null, matchMode: FilterMatchMode.STARTS_WITH  },
});

onMounted(() => {
  dataFacturas.value = data.value?.data as Facturas;
  dataVaules.value = dataFacturas?.value?.data ?? [];
});

watch(isFetched, () => {
  dataFacturas.value = data.value?.data as Facturas;
  dataVaules.value = dataFacturas?.value?.data ?? [];
});
</script>
