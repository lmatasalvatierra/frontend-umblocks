export default (state = {}, action) => {
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
