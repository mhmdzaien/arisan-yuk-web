<template>
  <div class="card">
    <div class="d-flex align-items-center card-header justify-content-between">
      <span class="fw-bold">Daftar Pelaksanaan Yasinan dan Iuran</span>
      <RouterLink to="/iuran/form" class="btn btn-primary"><i class="bi bi-plus"></i></RouterLink>
    </div>
    <div class="list-group flex-grow-1">
      <RouterLink :key="iuran.id" v-for="iuran in iuranCollection"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        :to="`/member/${iuran.id}`">
        <div class="ms-2 me-auto">
          <div class="fw-bold">{{ iuran.tempat }}</div>
          Tanggal : {{ formatDate(iuran.tanggal.seconds) }}
        </div>
        <RouterLink class="btn btn-outline-primary" :to="`/iuran/form/${iuran.id}`">Edit</RouterLink>
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { db } from '@/firebaseInit'
import type { IuranDocument } from '@/firestores/types'
import { collection, query, orderBy } from 'firebase/firestore'
import { useCollection } from 'vuefire'
import { formatDate } from '@/utils/helpers'

const iuranRef = collection(db, 'iuran')
const iuranCollection = useCollection<IuranDocument>(query(iuranRef, orderBy('tanggal', 'desc')))
</script>
