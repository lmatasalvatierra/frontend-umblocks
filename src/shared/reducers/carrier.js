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
            status: 'Green',
            insurance_type: action.payload.insuranceType,
            policy_number: Math.floor(Math.random() * 10000000),
            owner: action.payload.name,
            email: action.payload.email,
            effective_date: action.payload.effectiveDate.format('DD/MM/YYYY'),
            expiration_date: action.payload.expirationDate.format('DD/MM/YYYY'),
          },
        ],
      };
    default:
      return state;
  }
};
