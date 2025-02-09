<template>
  <div class="card">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-2">
      <div class="flex flex-col space-y-2">
        <label for="identificationDocumentId">Tipo de Identificación *</label>
        <Select 
          v-model="identification_document_id" 
          :options="tiposDeDocumento" 
          optionLabel="nombre" 
          optionValue="id"
          placeholder="Seleccione un tipo de identificación" 
          class="min-w-full" 
          filter
          :class="{ 'p-invalid': submitted && !identification_document_id }"
        />
        <small class="text-red-500" v-if="submitted && !identification_document_id">
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="identificationNumber">Número de Identificación *</label>
        <InputText 
          id="identificationNumber" 
          v-model="identification"
          placeholder="Ingrese el número de identificación"
          :class="{ 'p-invalid': submitted && !identification }"
        />
        <small class="text-red-500" v-if="submitted && !identification">
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="verificationDigit">Dígito de Verificación *</label>
        <InputText 
          id="verificationDigit" 
          v-model="dv" 
          placeholder="Ingrese el dígito de verificación"
          :class="{ 'p-invalid': submitted && !dv }"
        />
        <small class="text-red-500" v-if="submitted && !dv">
          Este campo es requerido
        </small>
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
        <label for="names">Nombres *</label>
        <InputText 
          id="names" 
          v-model="names" 
          placeholder="Ingrese los nombres"
          :class="{ 'p-invalid': submitted && !names }"
        />
        <small class="text-red-500" v-if="submitted && !names">
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="address">Dirección *</label>
        <InputText 
          id="address" 
          v-model="address" 
          placeholder="Ingrese la dirección"
          :class="{ 'p-invalid': submitted && !address }"
        />
        <small class="text-red-500" v-if="submitted && !address">
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="email">Correo Electrónico *</label>
        <InputText 
          id="email" 
          v-model="email" 
          placeholder="Ingrese el correo electrónico"
          :class="{ 'p-invalid': submitted && !email }"
        />
        <small class="text-red-500" v-if="submitted && !email">
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="phone">Teléfono *</label>
        <InputText 
          id="phone" 
          v-model="phone" 
          placeholder="Ingrese el número de teléfono"
          :class="{ 'p-invalid': submitted && !phone }"
        />
        <small class="text-red-500" v-if="submitted && !phone">
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="legalOrganizationId">ID Tipo de Organización *</label>
        <Select 
          v-model="legal_organization_id" 
          :options="tipoDeOrganizacion" 
          optionLabel="nombre" 
          optionValue="id"
          placeholder="Seleccione el tipo de organización" 
          class="min-w-full" 
          filter
          :class="{ 'p-invalid': submitted && !legal_organization_id }"
        />
        <small class="text-red-500" v-if="submitted && !legal_organization_id">
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="tributeId">ID del Tributo *</label>
        <Select 
          v-model="tribute_id" 
          :options="dataProducts" 
          optionLabel="nombre" 
          optionValue="id" 
          placeholder="Seleccione el tributo"
          class="min-w-full" 
          filter
          :class="{ 'p-invalid': submitted && !tribute_id }"
        />
        <small class="text-red-500" v-if="submitted && !tribute_id">
          Este campo es requerido
        </small>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="municipalityId">ID Municipio *</label>
        <Select 
          v-model="municipality_id" 
          :options="dataMunicipios" 
          optionLabel="name" 
          optionValue="id"
          placeholder="Seleccione el municipio"
          class="min-w-full" 
          filter
          :class="{ 'p-invalid': submitted && !municipality_id }"
        />
        <small class="text-red-500" v-if="submitted && !municipality_id">
          Este campo es requerido
        </small>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import type { Municipio } from "../../models/municipio";
import municipioService from "../../services/Factus/municipio.service";

const identification_document_id = ref('');
const identification = ref('');
const dv = ref('');
const company = ref('');
const trade_name = ref('');
const names = ref('');
const address = ref('');
const email = ref('');
const phone = ref('');
const legal_organization_id = ref('');
const tribute_id = ref('');
const municipality_id = ref('');
const submitted = ref(false);

const emit = defineEmits(["addCliente", "validationChange"]);

const isValid = computed(() => {
  return !!(
    identification_document_id.value &&
    identification.value &&
    dv.value &&
    names.value &&
    address.value &&
    email.value &&
    phone.value &&
    legal_organization_id.value &&
    tribute_id.value &&
    municipality_id.value
  );
});

const emitClienteData = () => {
  submitted.value = true;
  
  const customerData = {
    identification: identification.value,
    dv: dv.value,
    company: company.value || '',
    trade_name: trade_name.value || '',
    names: names.value,
    address: address.value,
    email: email.value,
    phone: phone.value,
    legal_organization_id: legal_organization_id.value.toString(),
    tribute_id: tribute_id.value.toString(),
    identification_document_id: identification_document_id.value.toString(),
    municipality_id: municipality_id.value.toString(),
  };

  emit("addCliente", customerData);
  emit("validationChange", isValid.value);
};

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

const dataProducts = [
  { id: 18, nombre: "IVA" },
  { id: 21, nombre: "No aplica" },
];

const dataMunicipios = ref<Municipio[]>([]);
const { data: dataMunicipalities, isFetching: isFetchingMunicipalities } = municipioService.useListQuery();

onMounted(() => {
  dataMunicipios.value = dataMunicipalities.value?.data ?? [];
});

watch(isFetchingMunicipalities, () => {
  dataMunicipios.value = dataMunicipalities.value?.data ?? [];
});

watch([
  identification_document_id, 
  identification, 
  dv, 
  company, 
  trade_name, 
  names, 
  address, 
  email, 
  phone, 
  legal_organization_id, 
  tribute_id,
  municipality_id
], () => {
  emitClienteData();
});
</script>