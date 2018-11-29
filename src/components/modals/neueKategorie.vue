<template>
  <q-modal @hide="$emit('closeModal')" content-classes="kategorieModal" :value="showModal"
  >
       <q-toolbar color="primary">
          <q-toolbar-title  style="font-weight: 200" >
           Neue Kategorie hinzufügen
          </q-toolbar-title>
      <q-btn rounded dense icon="close" @click="$emit('closeModal')" />
      </q-toolbar>
      <div class="q-ma-md">
        <IconPicker  class="q-mb-md" :expanseIconPicker="false"
        :selectedIcon="'more'" @setIcon="setIcon" />
      <q-input float-label="Name" v-model="newKategorie.katName" inverted class="q-mb-md"/>
      <q-input float-label="Beschreibung" v-model="newKategorie.katBeschreibung"
       inverted type="textarea" class="q-mb-md"  />
    <q-btn class="full-width q-ma-md" color="primary"
    label="Speichern" icon="save"
    :loading="getFBLoadingState">
    <span slot="loading">
      <q-spinner class="on-left" /> Speichern...
    </span></q-btn>
      </div>
  </q-modal>
</template>

<script>
import IconPicker from '../items/IconPicker.vue';

export default {
  name: 'neueKategorieModal',
  props: ['showModal'],
  data() {
    return {
      // modus: 'Login',
      newKategorie: {
        katName: '',
        katIcon: 'ac_unit',
        katBeschreibung: '',
      },
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
    setIcon(newIcon) {
      this.newKategorie.katIcon = newIcon;
      console.log(`emit this ${this.newKategorie.katIcon}`);
    },
  },
  components: {
    IconPicker,
  },
};
</script>

<style>
.kategorieModal{
  max-width: 400px;
  width: 100%;
}
</style>
