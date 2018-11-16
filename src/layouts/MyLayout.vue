<template>
  <q-layout view="hHh LpR lFf">
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
          <div class="gt-xs">
           Q-Knowledge
          </div>
            </q-toolbar-title>
                  <q-btn flat
         v-if="getUser.vorname == undefined"
          @click="startLogin=!startLogin"
          label="login"
          icon="account_circle">
        </q-btn>
        <q-btn flat
         v-if="getUser.vorname !== undefined"
           to="/profil"
           no-caps
          :label= "getUser.vorname"
          icon="account_circle">
        </q-btn>
         <q-btn flat
          @click="showmenu=!showmenu"
          icon="menu">
          <q-popover touch-position anchor="bottom left"
           self="top left" v-model="showmenu">
            <q-list highlight>
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
          <!-- <q-btn v-if="getUser.uid"
          flat
          dense
          round
          @click="rightDrawerOpen = !rightDrawerOpen"
          aria-label="Quests"
          icon='menu'
        /> -->
          <!-- <q-icon name="menu" />
        </q-btn> -->
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-if="getUser.uid" side="left"
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>{{getUser.vorname}} {{getUser.nachname}}</q-list-header>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
      </q-list>
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
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';

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
  },
  computed: {
    getUser() {
      // eslint-disable-next-line
      console.log('getUser');
      const user = this.$store.getters['storeKL/getUser'];
      return user;
    },
  },
  created: function setupFireBase() {
    this.$store.dispatch('storeKL/FirebaseSetup');
  },
};
</script>

<style>
</style>
