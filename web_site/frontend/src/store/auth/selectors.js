
export const selectAuthModule = (state) => state.auth;

export const selectIsAuth = (state) => selectAuthModule(state).isAuth;

export const selectUser = (state) => selectAuthModule(state).user;

export const selectIsLoading = (state) => selectAuthModule(state).loading;



