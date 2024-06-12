<script setup lang="ts">
import { ref } from "vue";
import { post } from "../utils/fetch";
import { alertError } from "../plugins/sweetalert";

const show = defineModel<boolean>({ required: true });

const patient = ref({
  name: null,
  surname: null,
  gender: null,
  age: null,
});
function handleCloseButton(): void {
  show.value = false;
}

async function handleCreateButton(): Promise<void> {
  try {
    await post("/api/patients", { patient: patient.value });
  } catch (error: any) {
    alertError(error);
  }
}
</script>
<template>
  <v-dialog v-model="show" width="50%">
    <v-card height="625">
      <v-card-title class="bg-primary">
        <span class="text-h5">Utwórz pacjenta</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="patient.name" label="Podaj imie" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="patient.surname" label="Podaj nazwisko" />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="patient.gender"
                :items="['Facet', 'Baba']"
                label="Podaj opis"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.number="patient.age"
                label="Podaj wiek"
                type="number"
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
