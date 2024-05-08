<template>
  <div class="card">
    <div class="card-header">
      <span>Form Iuran/Yasinan</span>
    </div>
    <div class="card-body">
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">Tanggal</label>
        <VueDatePicker v-model="model.tanggal"></VueDatePicker>
      </div>
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">Anggota Yang Dapat</label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Nama anggota"
        />
      </div>
    </div>
    <div class="card-footer text-end">
      <RouterLink to="/member" class="btn btn-outline-secondary me-1">Kembali</RouterLink>
      <button :disabled="saving" type="button" @click="simpan" class="btn btn-outline-primary ms-1">
        <div v-if="saving" class="spinner-border spinner-border-sm" role="status">
          <span class="sr-only"></span>
        </div>
        Simpan
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, type Ref } from 'vue'

const model: Ref<any> = defineModel({ default: {} })
const saving = ref(false)
const simpan = () => {}
</script>
