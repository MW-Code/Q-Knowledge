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
      :error="errorLogin.mail.error"
      error-label="errorLogin.mail.msg"
    >
      <q-input v-model="loginObjekt.mail" type="email"/>
    </q-field>
        <q-field
      icon="vpn_key"
      icon-color="primary"
      label="Login Passwort"
      :error="errorLogin.pw.error"
      error-label="errorLogin.pw.msg"
    >
      <q-input v-model="loginObjekt.pw" type="password"/>
    </q-field>
    <q-btn class="fit q-mt-md" color="primary"
    :disable="checkLoginError()"
    @click="startLogin" label="Login"/>
  </q-tab-pane>
  <q-tab-pane name="tab-2" class="q-pa-none">
      <q-stepper v-model="currentStep" ref="stepper" class="fit no-border">
                    <!-- Step: -->
                    <q-step default  name="1" title="">
                      <q-field
                      orientation="vertical"
                      icon="email"
                      label="Mail"
                      icon-color="primary"
                      class="q-mb-md q-mt-lg "
                      >
                        <q-input type="email" class="q-ma-xs" lower-case
                        v-model="register.mail" clearable />
                      </q-field>

                      <q-field
                      orientation="vertical"
                      icon="vpn_key"
                      label="Kennwort"
                      icon-color="primary"
                      class="q-mb-md q-mt-md "
                      >
                        <q-input type="password" class="q-ma-xs"
                          v-model="registerLogin.pw" clearable />
                      </q-field>
                    <q-field
                      orientation="vertical"
                      icon="vpn_key"
                      label="Kennwort wiederholen"
                      icon-color="primary"
                      class="q-mb-md q-mt-md "
                      >
                        <q-input type="password" class="q-ma-xs"
                          v-model="registerLogin.pw2" clearable />
                      </q-field>
                    </q-step>

                    <!-- Step: -->
                    <q-step name="2" title="">
                       <q-field
                      orientation="vertical"
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
                        <q-input float-label="Vorname" type="text" class="q-ma-xs"
                        v-model="register.vorname" />
                        <q-input float-label="Nachname" type="text" class="q-ma-xs"
                        v-model="register.nachname" />
                        <q-datetime popover class="q-ma-xs"
                        float-label="Geburtstag"
                        v-model="register.geburtsdatum" type="date"
                        format="dddd DD.MM.YYYY" :max="new Date()" />
                      </q-field>
                         <q-field
                      orientation="vertical"
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
                      orientation="vertical"
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
                      orientation="vertical"
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
                      <q-checkbox class="q-ml-lg q-mr-lg" v-model="agbsBlaBla"
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
                      color="primary"
                        @click="startRegister()"
                        label="Account anlegen"
                      />
                    </q-stepper-navigation>
                  </q-stepper>
  </q-tab-pane>
</q-tabs>
  </q-modal>
</template>

<script>
export default {
  name: 'loginRegisterModal',
  props: ['showModal'],
  data() {
    return {
      // modus: 'Login',
      currentStep: '1',
      errorLogin: {
        mail: { error: false, msg: '' },
        pw: { error: false, msg: '' },
      },
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
      agbsBlaBla: false,
      login: { mail: '', pw: '' },
      registerLogin: {
        pw: '',
        pw2: '',
      },
      registerInfo: { newsletter: false },
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
        mail: '', pw: '',
      },
    };
  },
  methods: {
    checkLoginError() {
      if (!this.errorLogin.mail.error &&
      !this.errorLogin.pw.error) {
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
