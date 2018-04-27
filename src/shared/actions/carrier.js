import request from 'axios';
import UrlConstants from '../constant/url-constants';
import { POLICY_SUBMIT } from '../constant/ActionTypes';

const API_URL = UrlConstants(process.env.API_BASE_URL).POLICY;

function policySubmit(policy) {
  return {
    type: POLICY_SUBMIT,
    payload: policy,
  };
}

export function submittingPolicy(policy) {
  return async function(dispatch){
    const result = await request.post(API_URL, {
      aggregated_limits: policy.aggregatedLimits,
      effective_date: policy.effectiveDate.format('X'),
      email: policy.email,
      expiration_date: policy.expirationDate.format('X'),
      insurance_type: policy.insuranceType[0],
      limits_per_occurrence: policy.limits,
      name: policy.name,
      user_id: policy.user_id,
    });
    dispatch(policySubmit(result));
  };
}
