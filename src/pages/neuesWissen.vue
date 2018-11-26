<template>
  <q-page class="flex flex-center row">
    <div class="pageContent q-pa-md col-11">
    <h2 class="q-döisplay-2">Wissen hinzufügen </h2>
    <div class="row justify-around">
      <div class="col-md-6 col-sm-12 col-xs-12  q-pa-md q-mb-sm shadow-1"
      style="background-color: #fff;">
      <p class="q-headline">Allgemeine Infos</p>
  <q-input float-label="Titel" v-model="neuesWissen.titel" inverted class="q-ma-sm"/>
  <q-input float-label="Beschreibung" v-model="neuesWissen.beschreibung"
  inverted type="textarea" class="q-ma-sm"  />
<!-- <q-field
  :error="mailHasError"
  error-label="Darf nicht leer bleiben"
>
  <q-input float-label="Beschreibung" v-model="model"  type="textarea"  />
</q-field> -->
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12 q-pa-md q-mb-sm shadow-1"
       style="background-color: #fff;">
<p class="q-headline"> Tag und Kategorie</p>
 <q-chips-input v-model="neuesWissen.tags" inverted
 float-label="Wissens Tag's" class="q-ma-sm"/>
   <q-select
   inverted filter class="q-ma-sm"
   float-label="Kategorie"
    color="primary"
    v-model="neuesWissen.kategorie"
    :options="getPrivateKategorien"
    @input="addKategorie"
  />
      </div>
    </div>
    <div class="row justify-around">
      <div class="col-md-12 col-sm-12 col-xs-12 q-pa-md q-mb-sm shadow-1"
        style="background-color: #fff;">
        <p class="q-headline">Wissens Inhalt</p>
        <q-btn label="Element Hinzufügen" icon="add" color="primary" class="full-width q-mb-md"/>
        <p  class="full-width" style="text-align:center"
        v-if="!neuesWissen.elemente">Noch keine Elemente hinzugefügt</p>
      </div>
    </div>
      <q-btn label="Wissen speichern" icon="save" color="primary"
      style="max-width: 500px" class="QV_centerThis full-width q-ma-md"/>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {
      neuesWissen: {
        titel: '',
        beschreibung: '',
        tags: [],
        kategorie: '',
        elemente: '',
      },
      // rightDrawerOpen: this.$q.platform.is.desktop,
    };
  },
  methods: {
    addKategorie() {
      if (this.neuesWissen.kategorie === 'neueKategorie') {
        console.log('add Kategorie');
        this.neuesWissen.kategorie = undefined;
      }
    },
  },
  computed: {
    getPrivateKategorien() {
      // eslint-disable-next-line
      const storedKategorie = this.$store.getters['storeKL/getPrivateKategorien'];
      const gruppenObjekt = [];
      console.log(storedKategorie);
      for (let i = 0; i < storedKategorie.length; i += 1) {
        const element = storedKategorie[i];
        const newObjekt = {
          label: element.name,
          value: element.name,
        };
        gruppenObjekt.push(newObjekt);
      }
      const newObjekt = {
        label: 'Neue Kategorie',
        value: 'neueKategorie',
        icon: 'add',
      };
      gruppenObjekt.push(newObjekt);
      return gruppenObjekt;
    },
  },
};
</script>

<style>
</style>
