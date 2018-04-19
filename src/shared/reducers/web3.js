const initialState = {
  web3Instance: null,
  managerInstance: null,
};

const web3 = (state = initialState, action) => {
  switch (action.type) {
    case 'WEB3_INITIALIZED':
      return {
        ...state,
        web3Instance: action.payload.web3Instance,
      };
    case 'MANAGER_INITIALIZED':
      return {
        ...state,
        managerInstance: action.payload.managerInstance,
      };
    default:
      return state;
  }
};

export default web3;
