<template>
  <section class="col-12">
    <h1>Halaman Member</h1>
    <ul class="list-group">
      <li v-for="(member, ind) in membersCollection" :key="member.id" class="list-group-item">
        No.{{ ind + 1 }} {{ member.nama }}
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
