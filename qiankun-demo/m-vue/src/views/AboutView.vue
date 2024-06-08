<template v-if="flag1">
  <div class="about">
    <h1>This is an about page</h1>
    <template v-if="flag1">
      <h2>222</h2>
    </template>
  </div>
</template>
<script setup>
  import { ref } from "vue"
  const flag = ref(true)
  const flag1 = ref(false)
</script>