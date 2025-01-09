<template>
  <div>
    <div class="text-center">
      <h1>Facturación</h1>
    </div>
    <div class="grid grid-cols-2 gap-5">
      <DatosGenerales />
      <DatosFacturacion />
    </div>
    <DatosCliente />
    <DatosProducto />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import DatosGenerales from "./DatosGenerales.vue";
import DatosFacturacion from "./DatosFacturacion.vue";
import DatosProducto from "./DatosProducto.vue";
import DatosCliente from "./DatosCliente.vue";

</script>
