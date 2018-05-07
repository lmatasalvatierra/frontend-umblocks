const initialState = {
  certificates_list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CERTIFICATES_SUMMARY':
      return {
        ...state,
        certificates_list: [...state.certificates_list, ...action.payload],
      };
    case 'CERTIFICATE_SUBMIT':
      return {
        ...state,
        certificates_list: [
          ...state.certificates_list,
          {
            key: state.certificates_list.length + 1,
            owner: action.payload.data.owner_name,
            email: action.payload.data.owner_email,
            certificate_number: action.payload.data.certificate_number,
            effective_date: action.payload.data.effective_date,
          },
        ],
      };
    case 'CERTIFICATE_VIEW':
      const policies = action.payload.data.policies.map(policy => [
        {
          key: 'Policy Number',
          value: policy.policy_number,
        },
        {
          key: 'Status',
          value: policy.status,
        },
        {
          key: 'Insurance Type',
          value: policy.insurance_type,
        },
        {
          key: 'Effective Date',
          value: policy.effective_date,
        },
        {
          key: 'Expiration Date',
          value: policy.expiration_date,
        },
      ]);
      return {
        ...state,
        general_information: [
          {
            key: 'Certificate Number',
            value: action.payload.data.certificate_number,
          },
          {
            key: "Owner's Email",
            value: action.payload.data.owner_email,
          },
          {
            key: "Owner's Name",
            value: action.payload.data.owner_name,
          },
          {
            key: 'Effective Date',
            value: action.payload.data.effective_date,
          },
        ],
        policies
      };
    default:
      return state;
  }
};
