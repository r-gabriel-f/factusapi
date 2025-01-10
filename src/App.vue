<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div>
    <Navbar v-if="route.name !== 'Login'" />
    <div class="m-5">
      <router-view />
    </div>
  </div>
</template>
