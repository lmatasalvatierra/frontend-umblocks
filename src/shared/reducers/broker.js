const initialState = {
  certificates_list: [
    {
      key: '1',
      owner: 'John Brown',
      email: 'peter@cw.com',
      certificate_number: '#4323243',
      effective_date: '4/11/2018',
    },
    {
      key: '2',
      owner: 'Jim Green',
      email: 'jim@cw.com',
      certificate_number: '#4334253',
      effective_date: '4/11/2018',
    },
    {
      key: '3',
      owner: 'Joe Black',
      email: 'joe@cw.com',
      certificate_number: '#4327856',
      effective_date: '4/11/2018',
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CERTIFICATE_SUBMIT':
      return {
        ...state,
        certificates_list: [
          ...state.certificates_list,
          {
            key: state.certificates_list.length + 1,
            owner: action.payload.name,
            email: action.payload.email,
            certificate_number: action.payload.certificateNumber,
            effective_date: action.payload.effectiveDate.format('DD/MM/YYYY'),
          },
        ],
      };
    default:
      return state;
  }
};
