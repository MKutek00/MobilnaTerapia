<script lang="ts" setup>
import { ref } from "vue";
import { Patient } from "../stores/user";
import AddPatient from "../components/AddPatient.vue";
import EditPatient from "./EditPatient.vue";
import RemovePatient from "./RemovePatient.vue";

import { del } from "../utils/fetch";
import { alertError } from "../plugins/sweetalert";

const addPatientDialog = ref(false);
const editPatientDialog = ref(false);
const deletePatientDialog = ref(false);

const editPatient = ref<Patient | null>(null);

const headersPatients = [
  {
    title: "Imie",
    key: "name",
  },
  { title: "Nazwisko", key: "surname" },
  { title: "Wiek", key: "age" },
  { title: "Płeć", key: "gender" },
  { title: "Actions", key: "actions", sortable: false },
];

const patients = ref<Patient[]>([
  {
    name: "John",
    surname: "Doe",
    gender: "Male",
    age: 35,
  },
  {
    name: "Alice",
    surname: "Smith",
    gender: "Female",
    age: 28,
  },
  {
    name: "Michael",
    surname: "Johnson",
    gender: "Male",
    age: 42,
  },
  {
    name: "Emily",
    surname: "Williams",
    gender: "Female",
    age: 50,
  },
  {
    name: "James",
    surname: "Brown",
    gender: "Male",
    age: 45,
  },
]);

function handleAddPatient() {
  addPatientDialog.value = true;
}
function handleEditPatient(p: Patient): void {
  editPatient.value = p;
  editPatientDialog.value = true;
}
function handleDeletePatient(p: Patient): void {
  editPatient.value = p;
  deletePatientDialog.value = true;
}

async function handelRemovePatient(confirm: boolean): Promise<void> {
  if (!confirm) return;
  try {
    await del("/api/patients/<patientId>", {
      patient: editPatient.value,
    });
    editPatient.value = null;
  } catch (error: any) {
    alertError(error);
  }
}
</script>
<template>
  <teleport to="body">
    <AddPatient v-if="addPatientDialog" v-model="addPatientDialog"></AddPatient>
  </teleport>
  <teleport to="body">
    <EditPatient
      v-if="editPatientDialog && editPatient"
      v-model="editPatientDialog"
      v-model:patient="editPatient"
    ></EditPatient>
  </teleport>
  <teleport to="body">
    <RemovePatient
      v-if="deletePatientDialog && editPatient"
      v-model="deletePatientDialog"
      @confirm="handelRemovePatient"
    ></RemovePatient>
  </teleport>

  <v-data-table :headers="headersPatients" :items="patients">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Lista pacjentów</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn class="mb-2" color="primary" dark @click="handleAddPatient">
          Dodaj pacjenta
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="handleEditPatient(item)"
        icon="mdi-pencil"
      >
      </v-icon>
      <v-icon size="small" @click="handleDeletePatient(item)" icon="mdi-delete">
      </v-icon>
    </template>
  </v-data-table>
</template>
