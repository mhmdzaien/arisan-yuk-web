<template>
  <div class="card bg-info d-flex flex-row align-items-center mb-2">
    <i class="bi bi-people fa-lg p-3 text-light"></i>
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-light">Jumlah Belum</h6>
      <h5 class="card-title text-light">{{ membersCollection.length }} Orang</h5>
    </div>
  </div>
  <section class="card">
    <div class="card-body text-center">
      <FortuneWheel
        v-if="membersOptions.length > 0"
        ref="wheel"
        style="width: 500px; max-width: 100%"
        :useWeight="true"
        :prizes="membersOptions"
        :canvas="canvasOptions"
        @rotateEnd="spindEnd"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCollection } from 'vuefire'
import { collection, query, where } from 'firebase/firestore'
import { db } from '@/firebaseInit'
import FortuneWheel, { type CanvasConfig } from 'vue-fortune-wheel'
import 'vue-fortune-wheel/style.css'
import Swal from 'sweetalert2'

const memberRef = collection(db, 'members')
const membersCollection = useCollection(query(memberRef, where('sudahDapat', '==', false)))
const wheel = ref(null)

const canvasOptions: CanvasConfig = {
  textDirection: 'vertical',
  fontSize: 14,
  textLength: 30,
  textRadius: 230
}

const membersOptions = computed(() => {
  return membersCollection.value
    .filter((row) => row.sudahDapat === false)
    .map((val, index) => {
      const colorList = ['#45ace9', '#dd3832', '#fef151']
      return {
        id: index, //val.id, //* The unique id of each prize, an integer greater than 0
        name: val.gelarDepan + ' ' + val.nama, // Prize name, display value when type is canvas (this parameter is not needed when type is image)
        value: val.nama, //* Prize value, return value after spinning
        bgColor: String(colorList[index % 3]), // Background color (no need for this parameter when type is image)
        color: '#000', // Font color (this parameter is not required when type is image),
        weight: 1
      }
    })
})

const spindEnd = (prize: any) => {
  Swal.fire({
    icon: 'success',
    title: 'Selamat',
    html: `<b>${prize.name}</b> Mendapatkan arisan yasinan selanjutnya`
  })
}
</script>
