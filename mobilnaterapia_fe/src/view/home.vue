<script lang="ts" setup>
import Schedule from "../components/Appointment.vue";
import Patient from "../components/Patient.vue";
import { useUserStore } from "../stores/user";
import { ref } from "vue";

const userStore = useUserStore();

const patientTab = ref(true);
const scheduleTab = ref(false);
</script>

<template>
  <v-container class="fill-height" fluid v-if="userStore.user">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h3 font-weight-black">
            Twoje dane
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="3" class="text-center">
                  <v-avatar size="200">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                      cover
                    ></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    v-model="userStore.user.name"
                    readonly
                    variant="underlined"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="userStore.user.lastName"
                    readonly
                    variant="underlined"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="userStore.user.mail"
                    readonly
                    variant="underlined"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-btn
          block
          variant="elevated"
          class="bg-secondary"
          text="Pacjenci"
          @click="
            () => {
              patientTab = true;
              scheduleTab = false;
            }
          "
        />
      </v-col>
      <v-col cols="6">
        <v-btn
          block
          variant="elevated"
          class="bg-secondary"
          text="Terminarz"
          @click="
            () => {
              patientTab = false;
              scheduleTab = true;
            }
          "
        />
      </v-col>

      <v-col cols="12" v-if="patientTab"> <Patient /> </v-col>
      <v-col cols="12" v-if="scheduleTab">
        <Schedule />
      </v-col>
    </v-row>
  </v-container>
</template>
