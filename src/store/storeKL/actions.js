/*
export function someAction (context) {
}
*/
import * as firebase from 'firebase';
import { Notify } from 'quasar';
import newfirebaseKnowledge from '../../../fbdataobjekt';
// import { Notify } from 'quasar';
// import router from '../../router/index';

function sendInfo(msg) {
  Notify.create({
    message: msg,
    timeout: 3000, // in milliseconds; 0 means no timeout
    // Available values: 'positive', 'negative', 'warning', 'info'
    type: 'info',
    // color: 'primary',
    textColor: 'white', // if default 'white' doesn't fits
    // icon: 'wifi',
  });
}

export const FirebaseSetup = ({ state, dispatch }) => {
  if (firebase.apps.length) {
    // dann mach nix :)
    return;
  }
  const firebaseKnowledge = newfirebaseKnowledge;
  state.fb = firebase.initializeApp(firebaseKnowledge, 'Q-Knowledge');
  state.fbStore = state.fb.firestore();
  state.fbStore.settings({ timestampsInSnapshots: true });
  state.fb.auth().useDeviceLanguage();
  if (state.fbStore !== undefined && state.fb !== undefined) {
    console.log('firebase online');
    state.fb.auth().onAuthStateChanged(() => {
      const user = state.fb.auth().currentUser;
      if (user) {
        // lade Account Infos
        dispatch('LoadAccountInfos', user);
      }
      console.log('Kein Benutzer angemeldet');
    });
  }
};

export const ResetFBError = ({ commit }) => {
  commit('resetFBError');
};

// Loge User mit PW und Mail ein
export const LoginUser = ({ commit, state }, payload) => {
  commit('resetFBError');
  commit('setFBLoading', true);
  return state.fb.auth().signInWithEmailAndPassword(payload.mail, payload.pw).then(() => {
    commit('setFBLoading', false);
    return true;
  }).catch((error) => {
    console.log(error);
    commit('setFBLoading', false);
    return false;
  });
};

export const RegisterUser = ({ commit, state }, payload) => {
  commit('resetFBError');
  commit('setFBLoading', true);
  return state.fb.auth().createUserWithEmailAndPassword(payload.mail, payload.pw).then(() => {
    // update User Profil
    const user = state.fb.auth().currentUser;
    user.updateProfile({ displayName: payload.userInfo.vorname });
    // schreibe User Infos in FireStore
    return state.fbStore.collection('AccountInfos').doc(user.uid).set(payload.userInfo).then(() => {
      // Speichern der User Infos erfolgreich
      sendInfo('Account erfolgreich erstellt.');
      commit('setFBLoading', false);
      return true;
    })
      .catch((error) => {
        // Fehler beim Speichern der User Infos
        console.log(error);
        return false;
      });
  }).catch((error) => {
    console.log(error);
    commit('setFBLoading', false);
    return false;
  });
};

// suche anhand der uid die Account infos aus dem FireStore raus
// Payload braucht eine uid des gesuchten Users
// return ist ein User Objekt mit all den Infos des Users
export const LoadAccountInfos = ({ state, commit }, payload) => {
  // return state.
  const userUID = payload.uid;
  const accInfoRef = state.fbStore.collection('AccountInfos').doc(userUID);
  // rufe das doc ab
  accInfoRef.get().then((doc) => {
    if (doc.exists) {
      // UserInfos
      const userPayload = { uid: doc.id, data: doc.data() };
      commit('setUser', userPayload);
    } else {
      // Kein User
      commit('setUser', '');
    }
  }).then(() => {});
};

export const SignOutUser = ({ commit, state }) => {
  state.fb.auth().signOut().then(() => {
    commit('setUser', '');
    sendInfo('Du wurdest erfolgreich abgemeldet');
  }).catch((error) => {
    // console.log('fehler beim logout');
    commit('setError', error);
    commit('setLoading', false);
  });
};
