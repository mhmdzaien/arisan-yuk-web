<template>
  <div class="card">
    <div class="d-flex align-items-center card-header justify-content-between">
      <span class="fw-bold">Daftar Pelaksanaan Yasinan dan Iuran</span>
      <RouterLink to="/iuran/form" class="btn btn-primary"><i class="bi bi-plus"></i></RouterLink>
    </div>
    <div class="list-group flex-grow-1">
      <div :key="iuran.id" v-for="iuran in iuranCollection"
        class="list-group-item list-group-item d-flex justify-content-between align-items-center">
        <RouterLink class="ms-2 me-auto d-flex flex-column flex-grow-1 text-decoration-none text-dark"
          :to="`/member/${iuran.id}`">
          <div class="fw-bold">{{ iuran.tempat }}</div>
          Tanggal : {{ formatDate(iuran.tanggal.seconds) }}
        </RouterLink>
        <MyButton @click="hapus($event, iuran)" class="btn btn-danger me-1">Hapus</MyButton>
        <RouterLink class="btn btn-outline-primary" :to="`/iuran/form/${iuran.id}`">Edit</RouterLink>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '~bootstrap/scss/bootstrap';

.list-group-item:has(.me-auto:hover) {
  background-color: $light;
}
</style>
<script setup lang="ts">
import MyButton from '@/components/MyButton.vue';
import { db } from '@/firebaseInit'
import type { IuranDocument } from '@/firestores/types'
import { collection, query, orderBy } from 'firebase/firestore'
import { useCollection } from 'vuefire'
import { formatDate } from '@/utils/helpers'
import Swal from 'sweetalert2';
import { deleteIuran } from '@/firestores/iuran.actions';

const iuranRef = collection(db, 'iuran')
const iuranCollection = useCollection<IuranDocument>(query(iuranRef, orderBy('tanggal', 'desc')))

const hapus = (loading: Function, row: IuranDocument) => {
  Swal.fire({
    title: "Anda yakin ?",
    text: `Menghapus iuran di tempat ${row.tempat}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      loading();
      deleteIuran(row.id!).finally(() => loading());
    }
  });
}
</script>
