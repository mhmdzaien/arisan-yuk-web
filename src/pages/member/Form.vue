<template>
  <div class="card">
    <div class="card-header">
      <span>Edit Member</span>
    </div>
    <div class="card-body">
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">Gelar Depan</label>
        <input type="text" class="form-control" v-model="model.gelarDepan"
          placeholder="Gelar depan ex : Pa, Guru, Bapak" />
      </div>
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">Nama</label>
        <input type="text" class="form-control" id="formGroupExampleInput" v-model="model.nama"
          placeholder="Nama anggota" />
      </div>
      <div class="mb-3">
        <label class="d-block">Sudah Dapat Arisan ?</label>
        <div class="form-check form-check-inline">
          <input class="form-check-input" v-model="model.sudahDapat" :value="true" type="radio" id="inlineCheckbox1" />
          <label class="form-check-label" for="inlineCheckbox1">Sudah</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" v-model="model.sudahDapat" :value="false" type="radio" id="inlineCheckbox2" />
          <label class="form-check-label" for="inlineCheckbox2">Belum</label>
        </div>
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
import { doc, getDoc, query, setDoc } from 'firebase/firestore'
import { useRoute, useRouter } from 'vue-router'
import { db } from '@/firebaseInit'
import { onMounted, ref, type Ref } from 'vue'
import type { MemberDocument } from '@/firestores/types'
const router = useRouter()
const route = useRoute()
const refMember = doc(db, 'members', route.params.id as string)
const model: Ref<MemberDocument> = ref({ nama: '', sudahDapat: false })
const saving = ref(false)

onMounted(() => {
  getDoc(refMember).then((row) => {
    model.value = row.data() as MemberDocument;
  })
})
const simpan = () => {
  saving.value = true
  setDoc(refMember, model.value)
    .then(() => {
      router.replace('/member')
    })
    .finally(() => {
      saving.value = false
    })
}
</script>
