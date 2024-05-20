<template>
  <div class="card">
    <div class="card-header">
      <span>Form Iuran/Yasinan</span>
    </div>
    <div class="card-body">
      <div v-if="isLoading" class="d-flex flex-column justify-content-center align-items-center">
        <div class="spinner-border spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
        <span class="h4">Loading Data...</span>
      </div>
      <template v-else>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">Tanggal</label>
          <VueDatePicker v-model="model.tanggal"></VueDatePicker>
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">Anggota Yang Dapat</label>
          <v-select v-model="model.memberId" :reduce="(member: any) => member.code" :options="members"></v-select>
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">Nominal Iuran</label>
          <input type="text" @keypress="validateNumber" class="form-control" v-model="nominalFormat" pattern="[0-9]*"
            inputmode="numeric" />
        </div>
        <div v-if="model.tagihanMember && Object.keys(model.tagihanMember).length > 0" class="mb-3">
          <label for="formGroupExampleInput" class="form-label">Set Tagihan Member</label>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th class="text-center">No</th>
                <th>Nama</th>
                <th>Tagihan</th>
                <th>Bayar</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(row, ind) in membersCollection" :key="row.id">
                <tr v-if="model.tagihanMember[row.id]">
                  <td class="text-center">{{ ind + 1 }}</td>
                  <td>{{ row.nama }}</td>
                  <td>
                    <input type="number" class="form-control" v-model="model.tagihanMember[row.id].tagihan" />
                  </td>
                  <td>
                    <input type="number" class="form-control" v-model="model.tagihanMember[row.id].bayar" />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </template>
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
import { computed, onMounted, ref, type ModelRef, type Ref } from 'vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { useCollection } from 'vuefire'
import { query, where, collection, getDoc, orderBy } from 'firebase/firestore'
import { db } from '@/firebaseInit'
import { saveIuran, getById } from '@/firestores/iuran.actions'
import type { IuranDocument } from '@/firestores/types'
import moment from 'moment'
import { useRoute } from 'vue-router'
const route = useRoute()
const formatter = new Intl.NumberFormat('id-ID')
const memberRef = collection(db, 'members')
const model: Ref<any> = ref({ nominal: 0, tanggal: moment().toDate() })
const membersCollection = useCollection(query(memberRef, orderBy('nama', 'asc')))

const members = computed(() => {
  return membersCollection.value.map((row) => {
    return {
      code: row.id,
      label: row.gelarDepan + " " + row.nama
    }
  })
})
const isLoading = ref(false);
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
  model.value.tempat = members.value.find(row => row.code === model.value.memberId)?.label;
  saveIuran(model.value).catch(err => {
    console.log(err);
  }).then(res => {
    model.value = res;
  }).finally(() => {
    saving.value = false;
  })
}

onMounted(() => {
  if (route.params.id) {
    isLoading.value = true;
    getById(route.params.id as string).then(res => {
      if (res) {
        const data = res;
        console.log(res)
        data.tanggal = moment.unix(res.tanggal.seconds).toDate();
        model.value = data;
      }
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      isLoading.value = false;
    })
  }
})
</script>
