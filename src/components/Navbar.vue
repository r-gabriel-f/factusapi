<template>
  <div class="card">
    <Menubar :model="items">
      <template #item="{ item }">
        <a
          :href="item.url"
          class="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base py-3 px-3"
          @click="item.action"
        >
          <i :class="item.icon" />
          {{ item.label }}
        </a>
      </template>
      <template #end>
        <div class="relative" @click="toggle">
          <a class="flex items-center" href="#">
            <span class="h-12 w-12 rounded-full flex items-center">
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                class="h-full w-full"
                shape="circle"
              />
            </span>
            <i class="pi pi-chevron-down" />
          </a>
          <Menu ref="menu" id="overlay_menu" :model="itemsIcon" :popup="true">
            <template #item="{ item }">
              <a
                :href="item.url"
                class="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base py-3 px-3"
                @click="item.action"
              >
                <i :class="item.icon" />
                {{ item.label }}
              </a>
            </template>
          </Menu>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { logout } from "../services/authentication";
import { useRouter } from "vue-router";

const router = useRouter();
const items = ref([
  {
    label: "Ver Facturas",
    icon: "pi pi-search",
    action: () => {
      router.push({ name: "VerFacturas" });
    },
  },
  {
    label: "Crear Factura",
    icon: "pi pi-plus",
    action: () => {
      router.push({ name: "Facturacion" });
    },
  },
]);

const menu = ref();
const itemsIcon = ref([
  {
    label: "Salir",
    icon: "pi pi-sign-out",
    action: () => {
      logout();
      router.push({ name: "Login" });
    },
  },
]);

const toggle = (event: Event) => {
  menu.value.toggle(event);
};
</script>
