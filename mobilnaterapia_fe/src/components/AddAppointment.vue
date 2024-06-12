<script setup lang="ts">
import { onMounted } from "vue";
import { Patient } from "../stores/user";
import { ref } from "vue";
import { alertError } from "../plugins/sweetalert";
import { get, post } from "../utils/fetch";

type AppointmentNew = {
  date: string | null;
  time: string | null;
  description: string | null;
  patient: Patient | null;
};

const newAppointment = defineModel<AppointmentNew>("appointment", {
  required: true,
});
const show = defineModel<boolean>({ required: true });
const patients = ref<Patient[]>([]);

function handleCloseButton(): void {
  newAppointment.value = {
    date: null,
    time: null,
    description: null,
    patient: null,
  };
  show.value = false;
}

async function handleCreateButton(): Promise<void> {
  try {
    await post("/api/appointments", { appointment: newAppointment.value });
    show.value = false;
  } catch (error: any) {
    alertError(error);
  }
  //TODO Create appointment
}

onMounted(async () => {
  try {
    patients.value = await get("/api/patient_list");
  } catch (error: any) {
    alertError(error);
  }
});
</script>
<template>
  <v-dialog v-model="show" width="50%">
    <v-card height="625">
      <v-card-title class="bg-primary">
        <span class="text-h5">Utwórz nową wizyte</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="newAppointment.patient"
                :items="patients"
                :itemTitle="(p:Patient)=>`${p.name} ${p.surname}`"
                return-object
                label="Wybierz pacjenta"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <VueDatePicker
                placeholder="Wybierz datę"
                v-model="newAppointment.date"
              ></VueDatePicker>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newAppointment.description"
                label="Podaj opis"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newAppointment.time"
                label="Podaj czas spotkania"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="handleCloseButton">
          Zamknij
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="handleCreateButton">
          Utwórz
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
