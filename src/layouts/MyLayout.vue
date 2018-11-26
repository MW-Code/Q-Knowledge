<template>
  <q-layout view="hHh LpR fFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
      >
        <!-- <q-btn
          :class="{ 'no-pointer-events': !getUser.uid }"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Stats"
        >
         <q-icon name="face" />
        </q-btn> -->
      <img @click="$router.push('/')"
          src="statics/images/logo.png"
          ref="/"
          style=" padding-left: 10px; cursor:pointer;">
        <q-toolbar-title>
          <div class="gt-xs" style="font-weight: 200" >
           Q-Knowledge
          </div>
            </q-toolbar-title>
          <q-btn flat round v-if="getUser.uid"
          @click="leftDrawerOpen=!leftDrawerOpen"
          icon="group_work"/>
        <q-btn flat rounded
          @click="profilLoginClick"
          :label="getUser.vorname ? getUser.vorname : 'login'"
          icon="account_circle"
          style="font-weight: 200">
        </q-btn>
        <q-btn flat round
          v-if="getUser.uid"
          @click="logOff"
          icon="power_settings_new"
          style="font-weight: 200">
        </q-btn>
         <q-btn flat round
          @click="showmenu=!showmenu"
          icon="menu">
          <q-popover touch-position anchor="bottom left"
           self="top left" v-model="showmenu">
              <q-list highlight no-border>
              <q-list-header>Menü</q-list-header>
              <q-item>
                <q-item-main label="Impressum" />
                <q-item-side>
                  <q-item-tile icon="announcement" />
                </q-item-side>
              </q-item>
              <q-item-separator />
              <q-item>
                <q-item-main label="Datenschutz" />
                <q-item-side>
                  <q-item-tile icon="lock" />
                </q-item-side>
              </q-item>
              <q-item-separator />
              <q-item>
                <q-item-main label="AGB's" />
                <q-item-side>
                  <q-item-tile icon="assignment" />
                </q-item-side>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-if="getUser.uid" side="left"
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        inset-delimiter>
        <q-collapsible icon-toggle >
          <template slot="header">
            <q-item-side :letter="getUser.vorname.substring(0,1).toUpperCase()">
            </q-item-side>
            <q-item-main>
              <q-item-tile> Mein Wissen</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-btn class="" round flat dense
                icon="add"
                @click.native="addNewItem"
              />
            </q-item-side>
          </template>
          <div>
          <q-item>
          <q-item-side icon="face" />
          <q-item-main label="bilder"/>
          </q-item>
          <q-item>
          <q-item-side icon="desktop_windows" />
          <q-item-main label="Admin Tricks"/>
          </q-item>
        </div>
        </q-collapsible>
      </q-list>
      <q-btn-group style="width: 100%;
    position: absolute;
    bottom: 0px;">
        <q-btn icon="group_work" style="width: 50%;" label="beitreten"/>
        <q-btn icon="group_work" style="width: 50%;" label="erstellen"/>
      </q-btn-group>
    </q-layout-drawer>

  <!-- <q-layout-drawer v-if="getUser.uid" side="right"
      v-model="rightDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Meine Quests</q-list-header>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
      </q-list>
    </q-layout-drawer> -->
    <q-page-container>
      <router-view />
    </q-page-container>
       <!-- <q-layout-footer class=" flex flex-center">
     <div style=" width: 70%;">
      </div>
    </q-layout-footer> -->
    <loginRegister :showModal = startLogin @closeModal = "startLogin = false"/>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import loginRegister from '../components/modals/loginRegister.vue';


export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      // rightDrawerOpen: this.$q.platform.is.desktop,
      startLogin: false,
      showmenu: false,
    };
  },
  methods: {
    openURL,
    logOff() {
      this.$store.dispatch('storeKL/SignOutUser');
    },
    profilLoginClick() {
      if (this.getUser.vorname) {
        this.$router.push('/profil');
      } else {
        this.startLogin = !this.startLogin;
      }
    },
    addNewItem() {
      console.log('addItem');
      this.$router.push('neueswissen');
    },
    addNewGroup() {

    },
  },
  computed: {
    getUser() {
      // eslint-disable-next-line
      const user = this.$store.getters['storeKL/getUser'];
      return user;
    },
  },
  components: {
    loginRegister,
  },
  created: function setupFireBase() {
    this.$store.dispatch('storeKL/FirebaseSetup');
  },
};
</script>

<style>
</style>
