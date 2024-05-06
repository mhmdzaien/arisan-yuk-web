<template>
    <div class="container text-center">
        <label class="mb-1 control-label fw-bold mt-1">Pintasan Nominal</label>
        <section class="d-flex flex-row mb-2">
            <div class="d-grid gap-2 flex-grow-1">
                <button class="btn btn-lg btn-outline-primary" type="button">100K</button>
                <button class="btn btn-lg btn-outline-primary" type="button">100K</button>
                <button class="btn btn-lg btn-outline-primary" type="button">100K</button>
            </div>
            <div class="d-grid gap-2 flex-grow-1 me-1 ms-1">
                <button class="btn btn-lg btn-outline-primary" type="button">100K</button>
                <button class="btn btn-lg btn-outline-primary" type="button">100K</button>
                <button class="btn btn-lg btn-outline-primary" type="button">100K</button>
            </div>
        </section>
        <label class="mb-1 control-label fw-bold mt-1">Manual Nominal</label>
        <input type="text" placeholder="Ketikan Nominal" class="form-control" pattern="[0-9]*" inputmode="numeric" />
    </div>

</template>
<script setup lang="ts">
</script>