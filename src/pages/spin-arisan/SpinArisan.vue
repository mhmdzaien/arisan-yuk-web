<template>
  <div>
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCollection } from 'vuefire'
import { collection, query, where } from 'firebase/firestore'
import { db } from '@/firebaseInit'
import FortuneWheel, { type CanvasConfig } from 'vue-fortune-wheel'
import 'vue-fortune-wheel/style.css'

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
        name: val.nama, // Prize name, display value when type is canvas (this parameter is not needed when type is image)
        value: val.nama, //* Prize value, return value after spinning
        bgColor: String(colorList[index % 3]), // Background color (no need for this parameter when type is image)
        color: '#000', // Font color (this parameter is not required when type is image),
        weight: 1
      }
    })
})

const spindEnd = (prize: any) => {
  alert(prize.name)
}
</script>
