
/*
export function someMutation (state) {
}
*/
export const setFBLoading = (state, payload) => {
  state.fbLoading = payload;
};

export const setFBError = (state, payload) => {
  state.fbError = payload;
};

export const resetFBError = (state) => {
  state.fbError = false;
};

export const setUser = (state, payload) => {
  if (payload === '') {
    state.user = '';
    return false;
  }
  state.user = payload.data;
  state.user.uid = payload.uid;
  return true;
};
