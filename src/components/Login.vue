<template>
  <div class="card flex justify-center">
    <div v-focustrap class="w-full sm:w-80 flex flex-col gap-6">
      <IconField>
        <InputIcon>
          <i class="pi pi-envelope" />
        </InputIcon>
        <InputText
          id="email"
          v-model="userForm.email"
          type="email"
          placeholder="email"
          autofocus
          fluid
        />
      </IconField>

      <IconField>
        <InputIcon>
          <i class="pi pi-key" />
        </InputIcon>
        <InputText
          id="password"
          v-model="userForm.password"
          type="text"
          placeholder="password"
          fluid
        />
      </IconField>
      <Button label="Submit" class="mt-2" @click="loginObtener" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { login } from "../services/authentication";

import { useRouter } from "vue-router";
const router = useRouter();
const userForm = ref({
  email: "",
  password: "",
});

const loginObtener = async () => {
  try {
    // Llamar al servicio de login y recibir los datos del token
    const tokenData = await login(userForm.value);

    // Verificar que tokenData contiene la respuesta esperada
    if (tokenData && tokenData.access_token && tokenData.expires_in) {
      setTimeout(() => {
        router.push({ name: "Facturacion" }); // Redirigir a la página de facturación
      }, 2000);
    } else {
      console.error("Error: Datos de token incompletos");
    }
  } catch (error) {
    console.error("Error en la autenticación:", error);
  }
};
</script>
