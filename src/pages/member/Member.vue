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
            <li :key="iuran.id" v-for="iuran, index in iuranCollection">
              <a v-if="iuran.id != currentIuran?.id && index < (iuranSize - 1)" class="dropdown-item" href="#"
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
          <a class="page-link" v-if="currentIndex > 0" href="#" @click="currentIndex--"> <i
              class="bi bi-arrow-right-circle"></i> </a>
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
                {{ ind + 1 }}. {{ member.nama }}
              </span>
              <i v-if="member.sudahDapat" class="bi bi-check-circle text-success"></i>
            </div>
            <div>
              <button class="btn btn-sm btn-outline-primary me-1" @click="modalBayar.show()">
                <i class="bi bi-cash"></i>
              </button>
              <RouterLink :to="'/member/' + member.id" class="btn btn-sm btn-outline-primary">
                <i class="bi bi-search"></i>
              </RouterLink>
            </div>
          </div>
          <hr class="mx-2 p-0 my-2" />
          <div class="d-flex justify-content-between">
            <span class="badge bg-warning">
              Sebelumnya :
              {{ prevIuran?.tagihanMember?.[member.id]?.bayar ?? "-" }}
            </span>
            <span class="badge bg-info">
              Tagihan :
              {{ currentIuran?.tagihanMember?.[member.id]?.total ?? "-" }}
            </span>
            <span class="badge bg-primary"> Bayar :
              {{ currentIuran?.tagihanMember?.[member.id]?.bayar ?? "-" }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </section>
  <div ref="refModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-body">
          <FormBayar></FormBayar>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
          <button type="button" class="btn btn-primary">Bayar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Modal } from 'bootstrap';
import { useCollection } from 'vuefire'
import { collection, limit, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebaseInit'
import { formatDate } from '@/utils/helpers';
import { computed, onMounted, ref } from 'vue';
import type { IuranDocument } from '@/firestores/types';
import FormBayar from "./FormBayar.vue";


const iuranSize = 5;
const memberRef = collection(db, 'members')
const iuranRef = collection(db, 'iuran');
const iuranCollection = useCollection<IuranDocument>(query(iuranRef, orderBy('tanggal', 'desc'), limit(iuranSize)));
const membersCollection = useCollection(memberRef)
const currentIndex = ref(0);

const refModal = ref(null);
let modalBayar: Modal = null;

onMounted(() => {
  modalBayar = new Modal(refModal.value, { backdrop: 'static' });
})

const currentIuran = computed(() => {
  return iuranCollection.value.at(currentIndex.value);
})

const prevIuran = computed(() => {
  return iuranCollection.value.at(currentIndex.value + 1);
})


</script>
