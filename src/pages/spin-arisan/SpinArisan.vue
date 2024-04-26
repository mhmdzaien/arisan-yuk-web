<template>
  <div>
    <!-- type: canvas -->
    <FortuneWheel
      ref="wheelEl"
      style="width: 500px; max-width: 100%"
      :verify="canvasVerify"
      :canvas="canvasOptions"
      :prizes="prizesCanvas"
      @rotateStart="onCanvasRotateStart"
      @rotateEnd="onRotateEnd"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import FortuneWheel, { type CanvasConfig } from 'vue-fortune-wheel'
import 'vue-fortune-wheel/style.css'

const prizeId = ref(0)

const wheelEl = ref()
const canvasVerify = ref(false) // Whether the turntable in canvas mode is enabled for verification
const verifyDuration = 2
const canvasOptions: CanvasConfig = {
  btnWidth: 140,
  borderColor: '#584b43',
  borderWidth: 6,
  lineHeight: 30,
  textDirection: 'vertical',
  fontSize: 11
}

const prizesCanvas = [
  {
    id: 1, //* The unique id of each prize, an integer greater than 0
    name: 'FAUQAL', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
    value: "Blue's value", //* Prize value, return value after spinning
    bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
    color: '#ffffff', // Font color (this parameter is not required when type is image)
    probability: 9 //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
  },
  {
    id: 2,
    name: 'HAMDAN',
    value: "Red's value",
    bgColor: '#dd3832',
    color: '#ffffff',
    probability: 9
  },
  {
    id: 3,
    name: 'MUHYAR',
    value: "Yellow's value",
    bgColor: '#fef151',
    color: '#ffffff',
    probability: 9
  },
  {
    id: 4, //* The unique id of each prize, an integer greater than 0
    name: 'RAHMADI', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
    value: "Blue's value", //* Prize value, return value after spinning
    bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
    color: '#ffffff', // Font color (this parameter is not required when type is image)
    probability: 9 //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
  },
  {
    id: 5,
    name: 'SANI',
    value: "Red's value",
    bgColor: '#dd3832',
    color: '#ffffff',
    probability: 9
  },
  {
    id: 6,
    name: 'SUPRIYADI',
    value: "Yellow's value",
    bgColor: '#fef151',
    color: '#ffffff',
    probability: 9
  },
  {
    id: 7, //* The unique id of each prize, an integer greater than 0
    name: 'TAJUDINOR', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
    value: "Blue's value", //* Prize value, return value after spinning
    bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
    color: '#ffffff', // Font color (this parameter is not required when type is image)
    probability: 9 //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
  },
  {
    id: 8,
    name: 'USTADZ YASIR',
    value: "Red's value",
    bgColor: '#dd3832',
    color: '#ffffff',
    probability: 9
  },
  {
    id: 9,
    name: 'WAHYU',
    value: "Yellow's value",
    bgColor: '#fef151',
    color: '#ffffff',
    probability: 9
  },
  {
    id: 10, //* The unique id of each prize, an integer greater than 0
    name: 'YUDI RAMADHAN', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
    value: "Blue's value", //* Prize value, return value after spinning
    bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
    color: '#ffffff', // Font color (this parameter is not required when type is image)
    probability: 9 //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
  },
  {
    id: 11,
    name: 'BAHRUDIN',
    value: "Red's value",
    bgColor: '#dd3832',
    color: '#ffffff',
    probability: 10
  }
]

const prizesImage = [
  {
    id: 1, //* The unique id of each prize, an integer greater than 0
    value: "Blue's value", //* Prize value, return value after spinning
    weight: 1 // Weight, if useWeight is true, the probability is calculated by weight (weight must be an integer), so probability is invalid
  },
  {
    id: 2,
    value: "Red's value",
    weight: 0
  },
  {
    id: 3,
    value: "Yellow's value",
    weight: 0
  }
]

const prizeRes = computed(() => {
  return prizesCanvas.find((item) => item.id === prizeId.value) || prizesCanvas[0]
})

onMounted(() => {
  wheelEl.value.startRotate() // Can start rotation
})

// Simulate the request back-end interface
function testRequest(verified, duration) {
  // verified: whether to pass the verification, duration: delay time
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(verified)
    }, duration)
  })
}

function onCanvasRotateStart(rotate) {
  if (canvasVerify.value) {
    const verified = true // true: the test passed the verification, false: the test failed the verification
    testRequest(verified, verifyDuration * 1000).then((verifiedRes) => {
      if (verifiedRes) {
        console.log('Verification passed, start to rotate')
        rotate() // Call the callback, start spinning
        canvasVerify.value = false // Turn off verification mode
      } else {
        alert('Failed verification')
      }
    })
    return
  }
  console.log('onCanvasRotateStart')
}

function onImageRotateStart() {
  console.log('onImageRotateStart')
}

function onRotateEnd(prize) {
  alert(prize.name)
}

function onChangePrize(id) {
  prizeId.value = id
}
</script>
