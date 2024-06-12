<script lang="ts" setup>
import { ref } from "vue";
import { alertError } from "../plugins/sweetalert";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const router = useRouter();
const userStore = useUserStore();

const login = ref<string>("");
const password = ref<string>("");

async function handleLoginButton(): Promise<void> {
  try {
    await userStore.login({ login: login.value, password: password.value });
    router.push("/home");
  } catch (error: any) {
    alertError(error.message);
  }
}

function handleRegisterRedirect(): void {
  router.push("/register");
}
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row class="justify-center align-center">
      <v-col cols="4">
        <v-card>
          <v-card-title>Zaloguj się!</v-card-title>
          <v-card-text>
            <v-form id="login__form">
              <v-text-field
                label="Login"
                v-model="login"
                :rules="[(val:string)=>{!!val || 'Pole nie może być puste'}]"
              ></v-text-field>
              <v-text-field
                label="Hasło"
                v-model="password"
                :rules="[(val:string)=>{!!val || 'Pole nie może być puste'}]"
              ></v-text-field>
              <span
                class="text-primary"
                @click="handleRegisterRedirect"
                style="cursor: pointer"
              >
                Brak konta? Zarejestruj się!
              </span>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              class="bg-primary"
              variant="elevated"
              @click="handleLoginButton"
              text="Zaloguj"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
