<template>
  <div>
    <!-- type: canvas -->
    <FortuneWheel
      ref="wheelEl"
      style="width: 500px; max-width: 100%"
      :key="wheelKey"
      :verify="canvasVerify"
      :canvas="canvasOptions"
      :prizes="prizes"
      :useWeight="true"
      @rotateEnd="onRotateEnd"
    />
  </div>
  <button @click="wheelKey = wheelKey + 1" type="button">Ubah</button>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref, computed } from 'vue'
import FortuneWheel, { type CanvasConfig, type PrizeConfig } from 'vue-fortune-wheel'
import 'vue-fortune-wheel/style.css'
import { useCollection } from 'vuefire'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebaseInit'

const memberRef = collection(db, 'members')
const membersCollection = useCollection(memberRef)
const wheelKey = ref(1)

const prizes: Ref<PrizeConfig[]> = computed(() => {
  return membersCollection.value
    .filter((row) => row.sudahDapat === false)
    .map((val, index) => {
      const colorList = ['#45ace9', '#dd3832', '#fef151']
      return {
        id: val.id, //* The unique id of each prize, an integer greater than 0
        name: val.nama, // Prize name, display value when type is canvas (this parameter is not needed when type is image)
        value: val.nama, //* Prize value, return value after spinning
        bgColor: String(colorList[index % 3]), // Background color (no need for this parameter when type is image)
        color: '#ffffff', // Font color (this parameter is not required when type is image)
        weight: 1
      }
    })
})
const wheelEl = ref()
const canvasVerify = ref(false) // Whether the turntable in canvas mode is enabled for verification
const canvasOptions: CanvasConfig = {
  btnWidth: 140,
  borderColor: '#584b43',
  borderWidth: 6,
  lineHeight: 30,
  textDirection: 'vertical',
  fontSize: 11
}

onMounted(() => {
  wheelEl.value.startRotate() // Can start rotation
})

function onRotateEnd(prize: PrizeConfig) {
  console.log(prize)
}
</script>
