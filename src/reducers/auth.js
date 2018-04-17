const initialState = {
  data: null
}
export default (state = initialState, action) => {
  switch (action.type) {
  case 'USER_LOGGED_IN':
    return {
      ...state,
      data: action.payload
    };
  default:
    return state;
  }
}
