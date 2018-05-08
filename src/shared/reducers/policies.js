const initialState = {
  policies_list: [],
  view_policy: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'POLICIES_SUMMARY_BEGIN':
      return {
        ...state,
        loadingPolicies: true,
      };
    case 'POLICY_CANCEL':
      return {
        ...state,
        policies_list: state.policies_list.map(
          (policy, index) =>
            index + 1 === action.payload.key
              ? { ...policy, status: action.payload.result.data.status }
              : policy,
        ),
      };
    case 'POLICIES_SUMMARY':
      return {
        ...state,
        loadingPolicies: false,
        policies_list: [...state.policies_list, ...action.payload],
      };
    case 'POLICY_SUBMIT':
      return {
        ...state,
        policies_list: [
          ...state.policies_list,
          {
            key: state.policies_list.length + 1,
            status: action.payload.data.status,
            insurance_type: action.payload.data.insurance_type,
            policy_number: action.payload.data.policy_number,
            email: action.payload.data.owner_email,
            effective_date: action.payload.data.effective_date,
            expiration_date: action.payload.data.expiration_date,
          },
        ],
      };
    case 'POLICY_VIEW':
      return {
        ...state,
        view_policy: [
          {
            key: 'Policy Number',
            value: action.payload.data.policy_number,
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
            key: "Owner's Address",
            value: action.payload.data.owner_address,
          },
          {
            key: 'Status',
            value: action.payload.data.status,
          },
          {
            key: 'Insurance Type',
            value: action.payload.data.insurance_type,
          },
          {
            key: 'Effective Date',
            value: action.payload.data.effective_date,
          },
          {
            key: 'Expiration Date',
            value: action.payload.data.expiration_date,
          },
          {
            key: 'Limits per occurrence',
            value: '$1,000,000',
          },
          {
            key: 'Aggregated Limits',
            value: '$4,000,000',
          },
        ],
      };
    default:
      return state;
  }
};
