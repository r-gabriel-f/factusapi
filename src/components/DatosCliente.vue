<template>
  <div class="card">
      <div class="grid grid-cols-4 gap-5">
        <div class="flex flex-col space-y-2">
          <label for="identificationDocumentId">Tipo de Identificación</label>
          <Select
            v-model="identification_document_id"
            :options="tiposDeDocumento"
            optionLabel="nombre"
            placeholder="Seleccione un tipo de identificación"
            class="w-full"
            filter
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="identificationNumber">Número de Identificación</label>
          <InputText
            id="identificationNumber"
            v-model="identification"
            placeholder="Ingrese el número de identificación"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="verificationDigit">Dígito de Verificación</label>
          <InputText
            id="verificationDigit"
            v-model="dv"
            placeholder="Ingrese el dígito de verificación (opcional)"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="company">Razón Social</label>
          <InputText
            id="company"
            v-model="company"
            placeholder="Ingrese la razón social (opcional)"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="tradeName">Nombre Comercial</label>
          <InputText
            id="tradeName"
            v-model="trade_name"
            placeholder="Ingrese el nombre comercial (opcional)"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="names">Nombres</label>
          <InputText
            id="names"
            v-model="names"
            placeholder="Ingrese los nombres (opcional)"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="address">Dirección</label>
          <InputText
            id="address"
            v-model="address"
            placeholder="Ingrese la dirección (opcional)"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="email">Correo Electrónico</label>
          <InputText
            id="email"
            v-model="email"
            placeholder="Ingrese el correo electrónico (opcional)"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="phone">Teléfono</label>
          <InputText
            id="phone"
            v-model="phone"
            placeholder="Ingrese el número de teléfono (opcional)"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="legalOrganizationId">ID Tipo de Organización</label>
          <Select
            v-model="legal_organization_id"
            :options="tipoDeOrganizacion"
            optionLabel="nombre"
            placeholder="Ingrese el ID del tipo de organización"
            class="w-full"
            filter
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="tributeId">ID del Tributo</label>
          <Select
            v-model="tribute_id"
            :options="dataProducts"
            optionLabel="name"
            placeholder="Ingrese el ID del tributo"
            class="w-full"
            filter
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="municipalityId">ID Municipio</label>
          <Select
            v-model="municipality_id"
            :options="dataMunicipios"
            optionLabel="name"
            placeholder="Ingrese el ID del municipio"
            class="w-full"
            filter
          />
        </div>
      </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import productsService  from "../services/Factus/atributes.service";
import type { Product } from "../models/product";
import type { Municipio } from "../models/municipio";
import municipioService from "../services/Factus/municipio.service";
const identification_document_id = ref("");
const identification = ref("");
const dv = ref("");
const company = ref("");
const trade_name = ref("");
const names = ref("");
const address = ref("");
const email = ref("");
const phone = ref("");
const legal_organization_id = ref("");
const tribute_id = ref("");
const municipality_id = ref("");

const tiposDeDocumento = [
  { id: 1, nombre: "Registro civil" },
  { id: 2, nombre: "Tarjeta de identidad" },
  { id: 3, nombre: "Cédula de ciudadanía" },
  { id: 4, nombre: "Tarjeta de extranjería" },
  { id: 5, nombre: "Cédula de extranjería" },
  { id: 6, nombre: "NIT" },
  { id: 7, nombre: "Pasaporte" },
  { id: 8, nombre: "Documento de identificación extranjero" },
  { id: 9, nombre: "PEP" },
  { id: 10, nombre: "NIT otro país" },
  { id: 11, nombre: "NUIP*" },
];

const tipoDeOrganizacion = [
  { id: 1, nombre: "Persona Jurídica" },
  { id: 2, nombre: "Persona Natural" },
];

const dataProducts = ref<Product[]>([]);
const { data, isFetched } = productsService.useListQuery();



const dataMunicipios = ref<Municipio[]>([]);
const { data: dataMunicipalities, isFetched: isFetchingMunicipalities } = municipioService.useListQuery();

onMounted(() => {
  dataProducts.value = data.value?.data ?? [];
});

watch(isFetched, () => {
  dataProducts.value = data.value?.data ?? [];
})

onMounted(() => {
  dataMunicipios.value = dataMunicipalities.value?.data ?? [];
});

watch(isFetchingMunicipalities, () => {
  dataMunicipios.value = dataMunicipalities.value?.data ?? [];
})
</script>
