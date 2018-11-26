<template>
  <q-modal @hide="$emit('closeModal')" content-classes="neuesWissen" :value="showModal"
  >
       <q-toolbar color="primary">
          <q-toolbar-title  style="font-weight: 200" >
           Neues Element hinzufügen
          </q-toolbar-title>
      <q-btn rounded dense icon="close" @click="$emit('closeModal')" />
      </q-toolbar>
  <!-- Tabs - notice slot="title" -->
    <q-btn class="fit q-mt-md" color="primary"
    :disable="$v.loginObjekt.$error"
    @click="startLogin" label="Login"
    :loading="getFBLoadingState">
    <span slot="loading">
      <q-spinner class="on-left" /> Login...
    </span></q-btn>
  </q-modal>
</template>

<script>

export default {
  name: 'neueElementModal',
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
.elementModal{
  max-width: 600px;
  width: 100%;
}
</style>
