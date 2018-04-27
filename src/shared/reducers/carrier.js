import { Status } from '../constant/enum-constants';

const initialState = {
  policies_list: [
    {
      key: '1',
      status: 'Green',
      insurance_type: 'GL',
      policy_number: '#4323243',
      owner: 'Peter Hasting',
      email: 'jim@cw.com',
      effective_date: '4/11/2018',
      expiration_date: '4/11/2019',
    },
    {
      key: '2',
      status: 'Green',
      insurance_type: 'GL',
      policy_number: '#4323243',
      owner: 'Peter Hasting',
      email: 'jim@cw.com',
      effective_date: '4/11/2018',
      expiration_date: '4/11/2019',
    },
    {
      key: '3',
      status: 'Green',
      insurance_type: 'GL',
      policy_number: '#4323243',
      owner: 'Peter Hasting',
      email: 'jim@cw.com',
      effective_date: '4/11/2018',
      expiration_date: '4/11/2019',
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'POLICY_SUBMIT':
      return {
        ...state,
        policies_list: [
          ...state.policies_list,
          {
            key: state.policies_list.length + 1,
            status: Status[action.payload.data.status],
            insurance_type: action.payload.data.insurance_type,
            policy_number: action.payload.data.policy_number,
            email: action.payload.data.owner_email,
            effective_date: action.payload.data.effective_date,
            expiration_date: action.payload.data.expiration_date,
          },
        ],
      };
    default:
      return state;
  }
};
