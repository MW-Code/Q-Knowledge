<template>
  <q-page class="flex flex-center">
    <div class="row">
    <div class="col-12">
    {{getUser.vorname}}
    </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      title: 'Tab-1',
    };
  },
  methods: {

  },
  computed: {
    getUser() {
      return this.$store.getters['storeKL/getUser'];
    },
  },
};
</script>
