<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Patient } from "../stores/user";
import { alertError } from "../plugins/sweetalert";
import { put } from "../utils/fetch";

const patient = defineModel<Patient>("patient", {
  required: true,
});
const show = defineModel<boolean>({ required: true });

const editablePatient = ref(JSON.parse(JSON.stringify(patient.value)));

function handleCloseButton(): void {
  show.value = false;
}

async function handleEditButton(): Promise<void> {
  try {
    await put("/api/patients/<patientId>", {
      patient: editablePatient.value,
    });
    patient.value = editablePatient.value;
    show.value = false;
  } catch (error: any) {
    alertError(error);
  }
}
</script>
<template>
  <v-dialog v-model="show" width="500px">
    <v-card height="625px">
      <v-card-title class="bg-primary">
        <span class="text-h5">Edytuj pacjenta</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editablePatient.name"
                label="Opis"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editablePatient.surname"
                label="Opis"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.number="editablePatient.age"
                label="Czas spotkania"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="editablePatient.gender"
                :items="['Facet', 'Baba']"
              ></v-select>
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
