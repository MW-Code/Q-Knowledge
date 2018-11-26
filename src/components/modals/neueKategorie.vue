<template>
  <q-modal @hide="$emit('closeModal')" content-classes="kategorieModal" :value="showModal"
  >
       <q-toolbar color="primary">
          <q-toolbar-title  style="font-weight: 200" >
           Neue Kategorie hinzufügen
          </q-toolbar-title>
      <q-btn rounded dense icon="close" @click="$emit('closeModal')" />
      </q-toolbar>
  <!-- Tabs - notice slot="title" -->
    <q-btn class="full-width q-mt-md" color="primary"
    label="Speichern"
    :loading="getFBLoadingState">
    <span slot="loading">
      <q-spinner class="on-left" /> Speichern...
    </span></q-btn>
  </q-modal>
</template>

<script>

export default {
  name: 'neueKategorieModal',
  props: ['showModal'],
  data() {
    return {
      // modus: 'Login',
    };
  },
  computed: {
    getFBError() {
      return this.$store.getters['storeKL/getFBError'];
    },
    getFBLoadingState() {
      return this.$store.getters['storeKL/getFBLoadingState'];
    },
  },
  methods: {
  },
};
</script>

<style>
.kategorieModal{
  max-width: 600px;
  width: 100%;
}
</style>
