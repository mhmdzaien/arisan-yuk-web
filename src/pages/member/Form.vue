<template>
  <div class="card">
    <div class="card-header">
      <span>Edit Member</span>
    </div>
    <div class="card-body">
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">Example label</label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Example input placeholder"
        />
      </div>
      <div class="mb-3">
        <label class="d-block">Sudah Dapat Arisan ?</label>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
          <label class="form-check-label" for="inlineCheckbox1">1</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
          <label class="form-check-label" for="inlineCheckbox2">2</label>
        </div>
      </div>
    </div>
    <div class="card-footer text-end">
      <RouterLink to="/member" class="btn btn-outline-secondary me-1">Kembali</RouterLink>
      <button type="button" class="btn btn-outline-primary ms-1">Simpan</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { doc } from 'firebase/firestore'
import { useRoute } from 'vue-router'
import { useDocument } from 'vuefire'
import { db } from '@/firebaseInit'
const route = useRoute()
const member = useDocument(doc(db, 'members', route.params.id))
</script>
