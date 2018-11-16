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

export const ResetError = ({ commit }) => {
  commit('resetError');
};
