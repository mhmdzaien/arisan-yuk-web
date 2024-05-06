<template>
    <div ref="refModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="container text-center">
                        <label class="mb-1 control-label fw-bold mt-1">Pintasan Nominal</label>
                        <section class="d-flex flex-row mb-2">
                            <div class="d-grid gap-2 flex-grow-1">
                                <button class="btn btn-lg btn-outline-primary" @click="modelBayar = 200000"
                                    type="button">200K</button>
                                <button class="btn btn-lg btn-outline-primary" @click="modelBayar = 150000"
                                    type="button">150K</button>
                                <button class="btn btn-lg btn-outline-primary" @click="modelBayar = 100000"
                                    type="button">100K</button>
                            </div>
                            <div class="d-grid gap-2 flex-grow-1 me-1 ms-1">
                                <button class="btn btn-lg btn-outline-primary" @click="modelBayar = 75000"
                                    type="button">75K</button>
                                <button class="btn btn-lg btn-outline-primary" @click="modelBayar = 50000"
                                    type="button">50K</button>
                                <button class="btn btn-lg btn-outline-primary" @click="modelBayar = 25000"
                                    type="button">25K</button>
                            </div>
                        </section>
                        <label class="mb-1 control-label fw-bold mt-1">Nominal</label>
                        <input type="text" @keypress="validateNumber" v-model="nominalFormat"
                            placeholder="Ketikan Nominal" class="form-control" pattern="[0-9]*" inputmode="numeric" />
                        <hr />

                    </div>
                </div>
                <div class="modal-footer flex-row justify-content-between">
                    <button type="button" class="btn btn-secondary flex-grow-1 me-1"
                        data-bs-dismiss="modal">Batal</button>
                    <button type="button" @click="saveBayar" class="btn btn-primary flex-grow-1 ms-1">Bayar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, type ModelRef, computed } from 'vue';
import { Modal } from '~bootstrap';

const emits = defineEmits<{ (e: 'onBayar', nominal: number): void }>()

const formatter = new Intl.NumberFormat('id-ID');
const modelBayar: ModelRef<number | undefined> = defineModel();
const refModal = ref(null);
let modalBayar: Modal = null;

onMounted(() => {
    modalBayar = new Modal(refModal.value, { backdrop: 'static' });
})

const nominalFormat = computed({
    get() {
        return formatter.format(modelBayar.value!);
    },
    set(newValue) {
        modelBayar.value = Number(newValue.replace(".", ""));
    }
})
const validateNumber = (evt: KeyboardEvent) => {
    const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const keyPressed: string = evt.key;
    if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault()
    }
}
const show = () => {
    modalBayar.show();
}

const hide = () => {
    modalBayar.hide();
}


const saveBayar = () => {
    emits("onBayar", modelBayar.value ?? 0)
}
defineExpose({
    show: show,
    hide: hide
})

</script>