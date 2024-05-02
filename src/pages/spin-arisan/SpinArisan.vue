<template>
  <div>
    <!-- type: canvas -->
    <FortuneWheel
      ref="wheelEl"
      style="width: 500px; max-width: 100%"
      :verify="canvasVerify"
      :canvas="canvasOptions"
      :prizes="prizesCanvas"
      :useWeight="true"
      @rotateEnd="onRotateEnd"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import FortuneWheel, { type CanvasConfig, type PrizeConfig } from 'vue-fortune-wheel'
import 'vue-fortune-wheel/style.css'
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import { db } from '@/firebaseInit'

const memberRef = collection(db, 'members')
const membersCollection = useCollection(memberRef)

const prizes: PrizeConfig[] = membersCollection.value.map((val, index) => {
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
console.log(prizes)
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

const prizesCanvas: Ref<PrizeConfig[]> = ref([
  {
    id: 1, //* The unique id of each prize, an integer greater than 0
    name: 'FAUQAL', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
    value: "Blue's value", //* Prize value, return value after spinning
    bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
    color: '#ffffff', // Font color (this parameter is not required when type is image)
    weight: 1 //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
  },
  {
    id: 2,
    name: 'HAMDAN',
    value: "Red's value",
    bgColor: '#dd3832',
    color: '#ffffff',
    weight: 1
  },
  {
    id: 3,
    name: 'MUHYAR',
    value: "Yellow's value",
    bgColor: '#fef151',
    color: '#ffffff',
    weight: 1
  },
  {
    id: 4, //* The unique id of each prize, an integer greater than 0
    name: 'RAHMADI', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
    value: "Blue's value", //* Prize value, return value after spinning
    bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
    color: '#ffffff', // Font color (this parameter is not required when type is image)
    weight: 1 //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
  },
  {
    id: 5,
    name: 'SANI',
    value: "Red's value",
    bgColor: '#dd3832',
    color: '#ffffff',
    weight: 1
  },
  {
    id: 6,
    name: 'SUPRIYADI',
    value: "Yellow's value",
    bgColor: '#fef151',
    color: '#ffffff',
    weight: 1
  },
  {
    id: 7, //* The unique id of each prize, an integer greater than 0
    name: 'TAJUDINOR', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
    value: "Blue's value", //* Prize value, return value after spinning
    bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
    color: '#ffffff', // Font color (this parameter is not required when type is image)
    weight: 1 //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
  },
  {
    id: 8,
    name: 'USTADZ YASIR',
    value: "Red's value",
    bgColor: '#dd3832',
    color: '#ffffff',
    weight: 1
  },
  {
    id: 9,
    name: 'WAHYU',
    value: "Yellow's value",
    bgColor: '#fef151',
    color: '#ffffff',
    weight: 1
  },
  {
    id: 10, //* The unique id of each prize, an integer greater than 0
    name: 'YUDI RAMADHAN', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
    value: "Blue's value", //* Prize value, return value after spinning
    bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
    color: '#ffffff', // Font color (this parameter is not required when type is image)
    weight: 1 //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
  },
  {
    id: 11,
    name: 'BAHRUDIN',
    value: "Red's value",
    bgColor: '#dd3832',
    color: '#ffffff',
    weight: 1
  }
])

onMounted(() => {
  prizesCanvas.value = [
    {
      id: 1, //* The unique id of each prize, an integer greater than 0
      name: 'FAUQAL', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
      value: "Blue's value", //* Prize value, return value after spinning
      bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
      color: '#ffffff', // Font color (this parameter is not required when type is image)
      weight: 1 //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
    },
    {
      id: 2,
      name: 'HAMDAN',
      value: "Red's value",
      bgColor: '#dd3832',
      color: '#ffffff',
      weight: 1
    },
    {
      id: 3,
      name: 'MUHYAR',
      value: "Yellow's value",
      bgColor: '#fef151',
      color: '#ffffff',
      weight: 1
    }
  ]
  wheelEl.value.startRotate() // Can start rotation
})

function onRotateEnd(prize: PrizeConfig) {
  console.log(prize)
}
</script>
