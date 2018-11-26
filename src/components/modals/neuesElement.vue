<template>
  <q-modal @hide="$emit('closeModal')" content-classes="elementModal" :value="showModal"
  >
       <q-toolbar color="primary">
          <q-toolbar-title  style="font-weight: 200" >
           Neues Element hinzufügen
          </q-toolbar-title>
      <q-btn rounded dense icon="close" @click="$emit('closeModal')" />
      </q-toolbar>
       <q-icon name="mdi-link"/>
    <q-btn class="full-width q-mt-md" color="primary" label="Speichern"
    :loading="getFBLoadingState">
    <span slot="loading">
      <q-spinner class="on-left" /> Speichern...
    </span></q-btn>
  </q-modal>
</template>

<script>

export default {
  name: 'neueElementModal',
  props: ['showModal'],
  data() {
    return {
      newKat: {
        icons: ['mdi-link'],
        katName: '',
        katBeschreibung: '',
      },
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
.elementModal{
  max-width: 600px;
  width: 100%;
}
</style>
