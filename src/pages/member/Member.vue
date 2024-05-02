<template>
  <h1>Halaman Member</h1>
  <input v-model="model.nama" type="text" />
  <button @click="simpan">Simpan</button>
  {{ membersCollection }}
</template>
<script setup lang="ts">
import { useCollection } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebaseInit'
import { ref, type Ref } from 'vue'

const memberRef = collection(db, 'members')
const membersCollection = useCollection(memberRef)
const model: Ref<{ nama?: string }> = ref({})
const simpan = () => {
  addDoc(memberRef, model.value)
}
</script>
