const initialState = {
  web3Instance: null
}

const web3 = (state = initialState, action) => {
  switch (action.type) {
  case 'WEB3_INITIALIZED':
    return {
      ...state,
      web3Instance: action.payload.web3Instance
    };
  default:
    return state;
  }
}

export default web3
