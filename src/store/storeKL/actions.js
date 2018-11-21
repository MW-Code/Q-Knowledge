/*
export function someAction (context) {
}
*/
import * as firebase from 'firebase';
import newfirebaseKnowledge from '../../../fbdataobjekt';
// import { Notify } from 'quasar';
// import router from '../../router/index';

export const FirebaseSetup = ({ commit }) => {
  if (firebase.apps.length) {
    // dann mach nix :)
    return;
  }
  const firebaseKnowledge = newfirebaseKnowledge;
  commit('setFirebase', firebase.initializeApp(firebaseKnowledge, 'Q-Knowledge'));
};

export const ResetFBError = ({ commit }) => {
  commit('resetFBError');
};

export const LoginUser = ({ commit, state }, payload) => {
  commit('resetFBError');
  commit('setFBLoading', true);
  state.fb.auth().signInWithEmailAndPassword(payload.mail, payload.pw).then(() => {
    commit('setFBLoading', false);
  }).catch((error) => {
    console.log(error);
    commit('setFBLoading', false);
  });
};

export const RegisterUser = ({ commit, state }, payload) => {
  commit('resetFBError');
  commit('setFBLoading', true);
  state.fb.auth().createUserWithEmailAndPassword(payload.mail, payload.pw).then(() => {
    commit('setFBLoading', false);
  }).catch((error) => {
    console.log(error);
    commit('setFBLoading', false);
  });
};
