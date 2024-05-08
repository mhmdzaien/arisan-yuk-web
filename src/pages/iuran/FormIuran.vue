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
        <v-select v-model="model.memberId" :options="members"></v-select>
      </div>
    </div>
    <div class="card-footer text-end">
      <Button @click="$router.back()" class="btn btn-outline-secondary me-1">Kembali</Button>
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
import { computed, ref, type ModelRef, type Ref } from 'vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { useCollection } from 'vuefire'
import { query, where, collection } from 'firebase/firestore'
import { db } from '@/firebaseInit'
import { createIuran } from '@/firestores/iuran.actions'
import type { IuranDocument } from '@/firestores/types'

const memberRef = collection(db, 'members')
const model: Ref<any> = ref({})
const membersCollection = useCollection(query(memberRef, where('sudahDapat', '==', false)))
const members = computed(() => {
  return membersCollection.value.map((row) => {
    return {
      code: row.id,
      label: row.nama
    }
  })
})
const saving = ref(false)
const simpan = () => {
  createIuran(model.value)
}
</script>
