<script lang="ts" setup>
import { ref } from "vue";
import { alertError } from "../plugins/sweetalert";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const router = useRouter();
const userStore = useUserStore();

const firstName = ref<string | null>(null);
const lastName = ref<string | null>(null);
const email = ref<string | null>(null);
const password = ref<string | null>(null);
const passwordRepeat = ref<string | null>(null);

async function handleRegisterButton(): Promise<void> {
  try {
    if (!firstName.value || !lastName.value || !email.value || !password.value)
      return;
    userStore.register({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });
    router.push("/");
  } catch (error: any) {
    alertError(error.message);
  }
}
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row class="justify-center align-center">
      <v-col cols="4">
        <v-card>
          <v-card-title>Zarejestruj się!</v-card-title>
          <v-card-text>
            <v-form id="register__form">
              <v-text-field
                label="Imię"
                v-model="firstName"
                :rules="[(val:string)=>{!!val || 'Pole nie może być puste'}]"
              ></v-text-field>
              <v-text-field
                label="Nazwisko"
                v-model="lastName"
                :rules="[(val:string)=>{!!val || 'Pole nie może być puste'}]"
              ></v-text-field>
              <v-text-field
                label="E-Mail"
                v-model="email"
                :rules="[(val:string)=>{!!val || 'Pole nie może być puste'}]"
              ></v-text-field>
              <v-text-field
                label="Hasło"
                v-model="password"
                :rules="[(val:string)=>{!!val || 'Pole nie może być puste'}]"
              ></v-text-field>
              <v-text-field
                label="Powtórz hasło"
                v-model="passwordRepeat"
                :rules="[(val:string)=>{val == password || 'Hasła muszą być takie same'}]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              class="bg-primary"
              variant="elevated"
              @click="handleRegisterButton"
              text="Utwórz konto"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
