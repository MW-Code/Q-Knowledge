<template>
  <q-page class="flex flex-center">
    <div class="pageContent q-pa-sm">
    <h4>Wissen hinzufügen </h4>
    <div class="row">
      <div class="col-md-5 col-sm-12 q-pa-md">
<q-field
  :error="mailHasError"
  error-label="Darf nicht leer bleiben"
>
  <q-input float-label="Name" v-model="model" />
</q-field>
<q-field
  :error="mailHasError"
  error-label="Darf nicht leer bleiben"
>
  <q-input float-label="Beschreibung" v-model="model"  type="textarea"  />
</q-field>
      </div>
      <div class="col-md-5 col-sm-12 q-pa-md">
<q-field orientation="vertical"
  icon="tag"
  label="Tags"
  helper="Helper"
  :error="mailHasError"
  error-label="We need a valid email"
  :count="10"
>
 <q-chips-input v-model="tags" float-label="Wissens Tag" />
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
      tags: [],
      // rightDrawerOpen: this.$q.platform.is.desktop,
    };
  },
};
</script>

<style>
</style>
