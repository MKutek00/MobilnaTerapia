<script setup lang="ts">
const show = defineModel<boolean>({ required: true });

const emit = defineEmits<{
  confirm: [decision: boolean];
}>();
</script>
<template>
  <v-dialog v-model="show" max-width="750px">
    <v-card>
      <v-card-title class="text-h5">
        Czy na pewno chcesz usunać tą wizytę?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="emit('confirm', false)"
          >Anuluj
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="emit('confirm', true)"
          >Usuń
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
