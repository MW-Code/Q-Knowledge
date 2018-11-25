<template>
  <q-page class="flex flex-center row">
    <div class="pageContent q-pa-md col-12">
    <h4>Wissen hinzufügen </h4>
    <div class="row">
      <div class="col-md-5 col-sm-11 col-xs-12 q-pa-md">
<q-field
 orientation="vertical"
  icon="face"
  label="test"
>
  <q-input float-label="Titel" v-model="neuesWissen.titel" />
  <q-input float-label="Beschreibung" v-model="neuesWissen.beschreibung"  type="textarea"  />
</q-field>
<!-- <q-field
  :error="mailHasError"
  error-label="Darf nicht leer bleiben"
>
  <q-input float-label="Beschreibung" v-model="model"  type="textarea"  />
</q-field> -->
      </div>
      <div class="col-md-5 col-sm-11 col-xs-12 q-pa-md">
<q-field orientation="vertical"
  icon="tag"
  label="Tags"
>


 <q-chips-input v-model="neuesWissen.tags" inverted
 float-label="Wissens Tag's" class="q-ma-sm"/>
   <q-select
   inverted filter class="q-ma-sm"
   float-label="Kategorie"
    color="primary"
    v-model="neuesWissen.kategorie"
    :options="getPrivateKategorien"
  />
</q-field>
      </div>
    </div>
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
      },
      // rightDrawerOpen: this.$q.platform.is.desktop,
    };
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
      };
      gruppenObjekt.push(newObjekt);
      return gruppenObjekt;
    },
  },
};
</script>

<style>
</style>
