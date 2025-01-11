<template>
  <div class="flex flex-col  items-center justify-center min-h-screen">
    <Toast />
    <h1 class="text-2xl font-bold mb-6">Inicio de Sesion</h1>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { login } from "../services/authentication";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const router = useRouter();
const userForm = ref({
  email: '',
  password: '',
});

const loginObtener = async () => {
  try {
    const tokenData = await login(userForm.value);
    if (tokenData && tokenData.access_token && tokenData.expires_in) {
      toast.add({
        severity: "success",
        summary: "Login Exitoso",
        detail: "Bienvenido",
        life: 3000,
      });
      setTimeout(() => {
        router.push({ name: "VerFacturas" });
      }, 2000);
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Credenciales incorrectas",
      life: 3000,
    });
  }
};
</script>
