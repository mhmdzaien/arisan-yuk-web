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
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">Nominal Iuran</label>
        <input type="text" @keypress="validateNumber" class="form-control" v-model="nominalFormat" pattern="[0-9]*"
          inputmode="numeric" />
      </div>
    </div>
    <div class="card-footer text-end">
      <button @click="$router.back()" class="btn btn-outline-secondary me-1">Kembali</button>
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
import moment from 'moment'

const formatter = new Intl.NumberFormat('id-ID')
const memberRef = collection(db, 'members')
const model: Ref<any> = ref({ nominal: 0, tanggal: moment('2023-09-29 00:00:00', 'YYYY-MM-DD HH:II').toDate() })
const membersCollection = useCollection(query(memberRef))
const members = computed(() => {
  return membersCollection.value.map((row) => {
    return {
      code: row.id,
      label: row.gelarDepan + " " + row.nama
    }
  })
})
const saving = ref(false)

const nominalFormat = computed({
  get() {
    return formatter.format(model.value.nominal)
  },
  set(newValue) {
    model.value.nominal = Number(newValue.replace('.', ''))
  }
})
const validateNumber = (evt: KeyboardEvent) => {
  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
  const keyPressed: string = evt.key
  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault()
  }
}

const simpan = () => {
  saving.value = true;
  const { nominal, tanggal, memberId } = model.value;
  createIuran({ tempat: 'Yasinan ' + model.value.memberId.label, nominal: nominal, tanggal: tanggal, memberId: memberId.code }).finally(() => {
    saving.value = false;
  })
}
</script>
