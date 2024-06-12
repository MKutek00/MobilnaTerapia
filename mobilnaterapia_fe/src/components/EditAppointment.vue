<script setup lang="ts">
import { ref } from "vue";
import { Patient } from "../stores/user";
import { alertError } from "../plugins/sweetalert";
import { put } from "../utils/fetch";

type Appointment = {
  date: string | null;
  time: string | null;
  description: string | null;
  patient: Patient | null;
};

const appointment = defineModel<Appointment>("appointment", {
  required: true,
});
const show = defineModel<boolean>({ required: true });

const editableAppointment = ref(JSON.parse(JSON.stringify(appointment.value)));

function handleCloseButton(): void {
  show.value = false;
}

async function handleEditButton(): Promise<void> {
  try {
    await put("/api/appointments/<appointmentId>", {
      appointment: editableAppointment.value,
    });
    appointment.value = editableAppointment.value;
    show.value = false;
  } catch (error: any) {
    alertError(error);
  }
}
</script>
<template>
  <v-dialog v-model="show" width="50%">
    <v-card height="625">
      <v-card-title class="bg-primary">
        <span class="text-h5">Edytuj wizytę</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="editableAppointment.patient"
                :itemTitle="(p:Patient)=>`${p.name} ${p.surname}`"
                disabled
              ></v-select>
            </v-col>
            <v-col cols="12">
              <VueDatePicker
                placeholder="Data spotkania"
                v-model="editableAppointment.date"
              ></VueDatePicker>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editableAppointment.description"
                label="Opis"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editableAppointment.time"
                label="Czas spotkania"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="handleCloseButton">
          Anuluj
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="handleEditButton">
          Zapisz zmiany
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
