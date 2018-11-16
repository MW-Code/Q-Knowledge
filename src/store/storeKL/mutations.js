/*
export function someMutation (state) {
}
*/
export const setFirebase = (state, payload) => {
  state.fb = payload;
  state.fbStore = state.fb.firestore();
  state.fbStore.settings({ timestampsInSnapshots: true });
  state.fb.auth().useDeviceLanguage();
  if (state.fbStore !== undefined && state.fb !== undefined) {
    console.log('firebase online');
  }
};


export const setUser = (state, payload) => {
  state.user = payload;
};
