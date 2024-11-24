<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
    <Button @click="alert('yo coso')">Login</Button>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "secondary",
});
</script>
