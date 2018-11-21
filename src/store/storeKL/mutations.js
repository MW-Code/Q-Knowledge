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

export const setFBLoading = (state, payload) => {
  console.log('lade');
  state.fbLoading = payload;
};

export const setFBError = (state, payload) => {
  state.fbError = payload;
};

export const resetFBError = (state) => {
  state.fbError = false;
};

export const setUser = (state, payload) => {
  state.user = payload;
};
