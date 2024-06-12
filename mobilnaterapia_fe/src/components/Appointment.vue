<script lang="ts" setup>
import AddAppointment from "./AddAppointment.vue";
import EditAppointment from "./EditAppointment.vue";
import RemoveAppointment from "./RemoveAppointment.vue";
import { Patient } from "../stores/user";
import { onMounted, ref } from "vue";
import { alertError } from "../plugins/sweetalert";
import { del, get } from "../utils/fetch";

type Appointment = {
  date: string | null;
  time: string | null;
  description: string | null;
  patient: Patient | null;
};

const addAppointmentDialog = ref(false);
const addAppointmentObject = ref<Appointment>({
  date: null,
  time: null,
  description: null,
  patient: null,
});

const editAppointmentDialog = ref(false);
const delteAppointmentDialog = ref(false);
const editAppointment = ref<Appointment | null>(null);

const headers = [
  {
    title: "Pacjent",
    key: "patient",
  },
  { title: "Data", key: "date" },
  { title: "Czas trwania", key: "time" },
  { title: "Opis", key: "description" },
  { title: "Actions", key: "actions", sortable: false },
];

const appointments = ref<Appointment[]>([
  {
    date: "2024-05-12",
    time: "10:00",
    patient: {
      name: "Smith",
      surname: "John",
      gender: "Male",
      age: 45,
    },
    description: "Routine check-up",
  },
  {
    date: "2024-05-13",
    time: "11:30",
    patient: {
      name: "Johnson",
      surname: "Alice",
      gender: "Female",
      age: 32,
    },
    description: "Dental cleaning",
  },
  {
    date: "2024-05-14",
    time: "14:15",
    patient: {
      name: "Williams",
      surname: "Michael",
      gender: "Male",
      age: 55,
    },
    description: "Tooth extraction",
  },
]);

function handleAddAppointment() {
  addAppointmentDialog.value = true;
  addAppointmentObject.value = {
    date: null,
    time: null,
    description: null,
    patient: null,
  };
}

function handleEditAppointment(a: Appointment): void {
  editAppointment.value = a;
  editAppointmentDialog.value = true;
}
function handleDeleteAppointment(a: Appointment): void {
  editAppointment.value = a;
  delteAppointmentDialog.value = true;
}

async function handleRemoveAppointment(confirm: boolean): Promise<void> {
  if (!confirm) return;
  try {
    await del("/api/appointments/<appointmentId>", {
      appointment: editAppointment.value,
    });
    editAppointment.value = null;
  } catch (error: any) {
    alertError(error);
  }
}

onMounted(async () => {
  // try {
  //   appointments.value = await get("/api/appointments");
  // } catch (error: any) {
  //   alertError(error);
  // }
});
</script>
<template>
  <teleport to="body">
    <AddAppointment
      v-if="addAppointmentDialog"
      v-model="addAppointmentDialog"
      v-model:appointment="addAppointmentObject"
    ></AddAppointment>
  </teleport>

  <teleport to="body">
    <EditAppointment
      v-if="editAppointmentDialog && editAppointment"
      v-model="editAppointmentDialog"
      v-model:appointment="editAppointment"
    ></EditAppointment>
  </teleport>

  <teleport to="body">
    <RemoveAppointment
      v-if="delteAppointmentDialog"
      v-model="delteAppointmentDialog"
      @confirm="handleRemoveAppointment"
    ></RemoveAppointment>
  </teleport>

  <v-data-table :headers="headers" :items="appointments">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Terminarz wizyt</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn class="mb-2" color="primary" dark @click="handleAddAppointment">
          Dodaj wizytę
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.patient="{ item }">
      {{ item.patient.name }} {{ item.patient.surname }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="handleEditAppointment(item)"
        icon="mdi-pencil"
      >
      </v-icon>
      <v-icon
        size="small"
        @click="handleDeleteAppointment(item)"
        icon="mdi-delete"
      >
      </v-icon>
    </template>
  </v-data-table>
</template>
