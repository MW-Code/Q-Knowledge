<template>
  <q-modal @hide="$emit('closeModal')" content-classes="loginModal" :value="showModal"
  >
       <q-toolbar color="primary">
          <q-toolbar-title  style="font-weight: 200" >
           Q-Knowledge
          </q-toolbar-title>
      <q-btn rounded dense icon="close" @click="$emit('closeModal')" />
      </q-toolbar>
<q-tabs align="justify" inverted>
  <!-- Tabs - notice slot="title" -->
  <q-tab default slot="title" name="tab-1" label="Login" />
  <q-tab slot="title" name="tab-2" label="Anmeldung" />
  <q-tab-pane name="tab-1">
    <q-field
      icon="email"
      label="Login Mail"
      :error="errorLogin.mail.error"
      error-label="errorLogin.mail.msg"
    >
      <q-input v-model="loginObjekt.mail" type="email"/>
    </q-field>
        <q-field
      icon="vpn_key"
      label="Login Passwort"
      :error="errorLogin.pw.error"
      error-label="errorLogin.pw.msg"
    >
      <q-input v-model="loginObjekt.pw" type="password"/>
    </q-field>
    <q-btn class="fit" color="primary"
    disable="checkLoginError"
    @click="startLogin" label="Login"/>
  </q-tab-pane>
  <q-tab-pane name="tab-2">Register Content</q-tab-pane>
</q-tabs>
  </q-modal>
</template>

<script>
export default {
  name: 'loginRegisterModal',
  props: ['showModal'],
  data() {
    return {
      modus: 'Login',
      errorLogin: {
        mail: { error: false, msg: '' },
        pw: { error: false, msg: '' },
      },
      loginObjekt: {
        mail: '', pw: '',
      },
    };
  },
  methods: {
    checkLoginError() {
      if (this.errorLogin.mail.error === false &&
      this.errorLogin.pw.error === false) {
        return false;
      }
      return true;
    },
    startLogin() {
      console.log('Login GO!');
    },
  },
};
</script>

<style>
.loginModal{
  max-width: 500px;
  width: 100%;
}
</style>
