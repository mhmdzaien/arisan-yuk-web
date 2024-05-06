<template>
  <section class="col-12">
    <ul class="list-group">
      <li
        v-for="(member, ind) in membersCollection"
        :key="member.id"
        class="list-group-item d-flex align-items-center"
      >
        <span class="h6 p-3">{{ ind + 1 }}</span>
        <div class="d-flex flex-column flex-grow-1">
          <div class="mb-1">
            <span class="fw-bold me-2" style="font-size: 17px">
              {{ member.nama }}
            </span>
            <span v-if="member.sudahDapat" class="badge bg-primary">Sudah Dapat</span>
          </div>
          <div class="d-flex">
            <span class="badge bg-success me-1">Sebelumnya : 0</span>
            <span class="badge bg-info ms-1">Tagihan : 0</span>
          </div>
        </div>
        <RouterLink :to="'/member/' + member.id" class="btn btn-sm btn-outline-primary">
          <i class="bi bi-search"></i>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import { db } from '@/firebaseInit'

const memberRef = collection(db, 'members')
const membersCollection = useCollection(memberRef)
</script>
