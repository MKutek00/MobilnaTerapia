<script lang="ts" setup>
import { alertError } from "./plugins/sweetalert";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();

async function handleLogout(): Promise<void> {
  try {
    await userStore.logout();
  } catch (error: any) {
    alertError(error);
  }
}
</script>

<template>
  <v-app>
    <v-app-bar class="text-center">
      <template v-slot:default>
        <v-app-bar-title class="text-h4 font-weight-bold">
          Mobilna terapia</v-app-bar-title
        >
      </template>

      <template v-slot:append>
        <v-btn
          v-if="userStore.user"
          class="bg-primary"
          variant="elevated"
          @click="handleLogout"
        >
          Wyloguj się
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<style>
.swal2-container {
  z-index: 999999 !important;
}
</style>
