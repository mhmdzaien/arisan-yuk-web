<template>
  <section class="col-12">
    <nav aria-label="Page navigation example" class="d-flex flex-column">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" v-if="currentIndex < iuranCollection.length - 2" href="#" @click="currentIndex++">
            <i class="bi bi-arrow-left-circle"></i>
          </a>
        </li>
        <li class="page-item flex-grow-1">
          <a class="page-link d-flex justify-content-center" data-bs-toggle="dropdown" aria-expanded="false" href="#">
            <span>{{ currentIuran?.tempat }} - {{ formatDate(currentIuran?.tanggal.seconds) }}
            </span>
          </a>
          <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser">
            <li :key="iuran.id" v-for="(iuran, index) in iuranCollection">
              <a v-if="iuran.id != currentIuran?.id && index < iuranSize - 1" class="dropdown-item" href="#"
                @click="currentIndex = index">
                {{ iuran.tempat }} - {{ formatDate(iuran.tanggal.seconds) }}
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <RouterLink class="dropdown-item" to="/iuran">Selengkapnya</RouterLink>
            </li>
          </ul>
        </li>
        <li class="page-item">
          <a class="page-link" v-if="currentIndex > 0" href="#" @click="currentIndex--">
            <i class="bi bi-arrow-right-circle"></i>
          </a>
        </li>
      </ul>
    </nav>
    <ul class="list-group">
      <li v-for="(member, ind) in membersCollection" :key="member.id"
        class="list-group-item d-flex align-items-center mt-1">
        <div class="d-flex flex-column flex-grow-1">
          <div class="mb-1 d-flex justify-content-between">
            <div>
              <span class="fw-bold me-2" style="font-size: 18px">
                {{ ind + 1 }}. {{ member.gelarDepan }} {{ member.nama }}
              </span>
              <i v-if="member.sudahDapat" class="bi bi-check-circle text-success"></i>
            </div>
            <div>
              <button class="btn btn-sm btn-outline-primary me-1" @click="showBayar(member.id)">
                <i class="bi bi-cash"></i>
              </button>
              <RouterLink :to="'/member/form/' + member.id" class="btn btn-sm btn-outline-primary">
                <i class="bi bi-pencil"></i>
              </RouterLink>
            </div>
          </div>
          <hr class="mx-2 p-0 my-2" />
          <div class="d-flex justify-content-between">
            <span class="badge bg-warning">
              Sebelumnya :
              {{ (prevIuran?.tagihanMember?.[member.id]?.bayar ?? 0) / 1000 ?? '-' }}K
            </span>
            <span class="badge bg-info">
              Tagihan :
              {{ (currentIuran?.tagihanMember?.[member.id]?.tagihan ?? 0) / 1000 ?? '-' }}K
            </span>
            <span class="badge bg-primary">
              Bayar : {{ (currentIuran?.tagihanMember?.[member.id]?.bayar ?? 0) / 1000 ?? '-' }}K
            </span>
          </div>
        </div>
      </li>
    </ul>
  </section>
  <ModalBayar ref="modalBayar" :saving="savingBayar" @on-bayar="onBayar" v-model="nominalBayar"></ModalBayar>
</template>
<script setup lang="ts">
import { useCollection } from 'vuefire'
import { collection, doc, limit, orderBy, query, writeBatch } from 'firebase/firestore'
import { db } from '@/firebaseInit'
import { formatDate } from '@/utils/helpers'
import { computed, ref, type Ref } from 'vue'
import type { IuranDocument } from '@/firestores/types'
import ModalBayar from './ModalBayar.vue'
import { bayarIuran } from '@/firestores/iuran.actions'


const iuranSize = 10
const memberRef = collection(db, 'members')
const iuranRef = collection(db, 'iuran')
const iuranCollection = useCollection<IuranDocument>(
  query(iuranRef, orderBy('tanggal', 'desc'), limit(iuranSize))
)
const membersCollection = useCollection(query(memberRef, orderBy('nama')))
const currentIndex = ref(0)
const modalBayar: Ref<any> = ref(null)
const nominalBayar: Ref<number> = ref(0)
const bayarMemberId = ref('')
const savingBayar = ref(false)

const currentIuran = computed(() => {
  return iuranCollection.value.at(currentIndex.value)
})

const prevIuran = computed(() => {
  return iuranCollection.value.at(currentIndex.value + 1)
})

const showBayar = (memberId: string) => {
  bayarMemberId.value = memberId
  nominalBayar.value = currentIuran.value?.tagihanMember?.[memberId]?.bayar ?? 0
  modalBayar.value?.show()
}
const onBayar = async (nominal: number) => {
  savingBayar.value = true
  let current = Object.assign({}, iuranCollection.value.at(currentIndex.value))
  await bayarIuran(current, bayarMemberId.value, nominal)
  savingBayar.value = false
  modalBayar.value?.hide()
}
</script>
