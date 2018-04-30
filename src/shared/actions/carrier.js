import request from 'axios';
import { history } from 'client/store';
import UrlConstants from '../constant/url-constants';
import { POLICY_SUBMIT, POLICY_VIEW } from '../constant/ActionTypes';

const API_URL = UrlConstants(process.env.API_BASE_URL).POLICY;

function policySubmit(policy) {
  return {
    type: POLICY_SUBMIT,
    payload: policy,
  };
}

function policyView(policy) {
  return {
    type: POLICY_VIEW,
    payload: policy,
  };
}

export function viewingPolicy(policyid, userid) {
  return async function(dispatch) {
    const result = await request.get(`${API_URL}/${policyid}`);
    dispatch(policyView(result));
    history.replace(`${userid}/policy/${policyid}`);
  };
}

export function submittingPolicy(policy) {
  return async function(dispatch) {
    const result = await request.post(API_URL, {
      aggregated_limits: policy.aggregatedLimits,
      effective_date: policy.effectiveDate.format('X'),
      owner_email: policy.ownerEmail,
      expiration_date: policy.expirationDate.format('X'),
      insurance_type: policy.insuranceType[0],
      limits_per_occurrence: policy.limits,
      user_id: policy.user_id,
    });
    dispatch(policySubmit(result));
  };
}
