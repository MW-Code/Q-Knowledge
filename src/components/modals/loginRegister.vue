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
  <q-tab-pane name="tab-1" class="q-ma-md">
    <q-field
      icon="email"
      icon-color="primary"
      label="Login Mail"
      :error="$v.loginObjekt.mail.$error"
      error-label="Kein gültiges Mailformat erkannt"
    >
    <q-input @blur="$v.loginObjekt.mail.$touch"
    v-model="loginObjekt.mail" type="email" lower-case/>
    </q-field>
        <q-field
      icon="vpn_key"
      icon-color="primary"
      label="Login Passwort"
      :error="$v.loginObjekt.pw.$error"
      error-label="Bitte gebe ein Passwort ein"
    >
      <q-input @keyup.enter="startLogin" @blur="$v.loginObjekt.pw.$touch"
      v-model="loginObjekt.pw" type="password"/>
    </q-field>
    <q-btn class="full-width q-mt-md" color="primary"
    :disable="$v.loginObjekt.$error"
    @click="startLogin" label="Login"
    :loading="getFBLoadingState">
    <span slot="loading">
      <q-spinner class="on-left" /> Login...
    </span></q-btn>
  </q-tab-pane>
  <q-tab-pane name="tab-2" class="q-pa-none">
      <q-stepper v-model="currentStep" ref="stepper" class="fit no-border">
                    <!-- Step: -->
                  <q-step default  name="1" title="">
                    <q-field
                    icon="email"
                    label="Login Mail"
                    icon-color="primary"
                    class="q-mb-md q-mt-lg "
                    :error="$v.register.mail.$error"
                    error-label="Bitte gebe eine gültige Mail Adresse ein"
                    >
                      <q-input type="email"
                      class="q-ma-xs" lower-case
                      @blur="$v.register.mail.$touch"
                      v-model="register.mail" clearable />
                    </q-field>

                    <q-field
                    icon="vpn_key"
                    label="Login Passwort"
                    icon-color="primary"
                    class="q-mb-md q-mt-md "
                     :error="$v.registerInfo.pw.$error"
                    error-label="Bitte gebe ein Passwort ein"
                    >
                      <q-input @blur="$v.registerInfo.pw.$touch"
                        type="password" class="q-ma-xs"
                        v-model="registerInfo.pw" clearable />
                    </q-field>
                  <q-field

                    icon="vpn_key"
                    label="Login Passwort wiederholen"
                    icon-color="primary"
                    class="q-mb-md q-mt-md "
                    :error="$v.registerInfo.pw2.$error"
                    error-label="Bitte gebe ein Passwort ein"
                    >
                      <q-input @blur="$v.registerInfo.pw2.$touch"
                        type="password" class="q-ma-xs"
                        v-model="registerInfo.pw2" clearable />
                    </q-field>
                  </q-step>

                  <!-- Step: -->
                  <q-step name="2" title="">
                    <q-field
                    icon="account_circle"
                    label="Person"
                    icon-color="primary"
                    class="q-mb-md q-mt-lg "
                    >
                    <q-select
                    class="q-ma-xs"
                    color="primary"
                    v-model="register.geschlecht"
                    :options="optionsGeschlecht"
                    float-label="Anrede"

                  />
                    <q-input float-label="Titel (Prof, Dr, Dipl.-Psych, ...)"
                    type="text" class="q-ma-xs"
                    v-model="register.titel" />
                      <q-input float-label="Vorname"
                      type="text" class="q-ma-xs"
                      v-model="register.vorname"
                      @blur="$v.register.vorname.$touch"/>
                      <q-input float-label="Nachname" type="text" class="q-ma-xs"
                      v-model="register.nachname" />
                      <q-datetime popover class="q-ma-xs"
                      float-label="Geburtstag"
                      v-model="register.geburtsdatum" type="date"
                      format="dddd DD.MM.YYYY" :max="new Date()" />
                    </q-field>
                        <q-field

                    icon="place"
                    label="Anschrift"
                    icon-color="primary"
                    class="q-mb-md q-mt-lg "
                    >
                      <q-input float-label="Straße und Hausnummer" type="text" class="q-ma-xs"
                      v-model="register.anschrift.strasseHausnummer" />
                      <q-input float-label="PLZ" type="number" class="q-ma-xs"
                      v-model="register.anschrift.plz" />
                        <q-input float-label="Ort" type="text" class="q-ma-xs"
                      v-model="register.anschrift.ort" />
                    </q-field>
                    </q-step>

                    <!-- Step: -->
                    <q-step name="3" title="">
                       <q-field

                      icon="phone"
                      label="Telefonnummer"
                      icon-color="primary"
                      class="q-mb-md q-mt-lg "
                      >
                        <q-input type="number" class="q-ma-xs"
                        v-model="register.tel" clearable />
                      </q-field>
                      <!-- <q-field
                      icon="school"
                      label="Wie haben Sie von uns erfahren?"
                      icon-color="primary"
                      class="q-mb-md"

                      >
                      <q-select
                      class="q-ma-xs"
                      multiple
                      color="primary"
                      v-model="register.empfohlen"
                      :options="optionsFachgebiet"
                    />
                      </q-field> -->
                      <q-checkbox class="q-ma-lg" v-model="registerInfo.newsletter"
                      label="Newsletter und andere Spam" />
                      <q-checkbox class="q-ml-lg q-mr-lg" v-model="agbs"
                      label="AGB bla bla - Datenschutz bla bla" />
                    </q-step>
                    <q-stepper-navigation class="q-pa-md">
                      <q-btn class="q-mr-md"
                        flat
                        @click="$refs.stepper.previous()"
                        label="Zurück"
                      />
                      <q-btn v-if="currentStep !== '3'"
                      color="primary"
                        @click="$refs.stepper.next()"
                        label="Weiter"
                      />
                       <q-btn v-if="currentStep == '3'"
                       :disable="checkRegisterDisable()"
                      color="primary"
                        @click="startRegister()"
                        label="Account anlegen"
                        :loading="getFBLoadingState"> <span slot="loading">
                          <q-spinner class="on-left" />Account anlegen...
                      </span></q-btn>
                    </q-stepper-navigation>
                  </q-stepper>
  </q-tab-pane>
</q-tabs>
  </q-modal>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'loginRegisterModal',
  props: ['showModal'],
  data() {
    return {
      // modus: 'Login',
      currentStep: '1',
      optionsGeschlecht: [
        {
          label: 'Herr',
          value: 'herr',
        },
        {
          label: 'Frau',
          value: 'frau',
        },
        {
          label: 'Anderes',
          value: 'anderes',
        },
      ],
      agbs: false,
      registerInfo: {
        pw: '',
        pw2: '',
        newsletter: false,
      },
      register: {
        mail: '',
        geschlecht: 'herr',
        titel: '',
        vorname: '',
        nachname: '',
        geburtsdatum: '',
        anschrift: {
          strasseHausnummer: '',
          plz: '',
          ort: '',
        },
        tel: '',
      },
      loginObjekt: {
        mail: '',
        pw: '',
      },
    };
  },
  validations: {
    loginObjekt: {
      mail: { required, email },
      pw: { required, minLength: minLength(8) },
    },
    registerInfo: {
      pw: { required, minLength: minLength(8) },
      pw2: { required, sameAsPassword: sameAs('pw') },
    },
    register: {
      mail: { required, email },
      vorname: { required },
      nachname: { required },
      geburtsdatum: { required },
      anschrift: {
        strasseHausnummer: { required },
        plz: { required },
        ort: { required },
      },
    },
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
    checkRegisterDisable() {
      this.$v.registerInfo.$touch();
      this.$v.register.$touch();
      if (this.$v.registerInfo.$error ||
      this.$v.register.$error || !this.agbs) {
        return true;
      }
      return false;
    },
    startLogin() {
      this.$v.loginObjekt.$touch();
      if (this.$v.loginObjekt.$error) {
        console.log('Fail');
        return false;
      }
      console.log('Login GO!');
      this.$store.dispatch('storeKL/LoginUser', {
        mail: this.loginObjekt.mail,
        pw: this.loginObjekt.pw,
      }).then((res) => {
        if (res === true) { this.$emit('closeModal'); }
      });
      return true;
    },
    startRegister() {
      this.$v.register.$touch();
      this.$v.registerInfo.$touch();
      if (this.$v.registerInfo.$error || this.$v.register.$error) {
        console.log('Fail');
        return false;
      }
      console.log('Register GO!');
      this.$store.dispatch('storeKL/RegisterUser', {
        mail: this.register.mail,
        pw: this.registerInfo.pw,
        userInfo: this.register,
      }).then((res) => {
        if (res === true) { this.$emit('closeModal'); }
      });

      return true;
    },
  },
};
</script>

<style>
.loginModal{
  max-width: 600px;
  width: 100%;
}
</style>
