import request from 'axios';
import { history } from 'client/store';
import UrlConstants from '../constant/url-constants';
import {
  POLICY_SUBMIT,
  POLICY_VIEW,
  POLICIES_SUMMARY,
} from '../constant/ActionTypes';

const API_URL = UrlConstants(process.env.API_BASE_URL).POLICY;
const API_CARRIER = UrlConstants(process.env.API_BASE_URL).CARRIER;

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

function policiesSummary(policies) {
  return {
    type: POLICIES_SUMMARY,
    payload: policies,
  };
}

export function viewingPolicy(policyid, userid) {
  return async function(dispatch) {
    const result = await request.get(`${API_URL}/${policyid}`);
    dispatch(policyView(result));
    history.push(`${userid}/policy/${policyid}`);
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

export function gettingPoliciesSummary(userid) {
  return async function(dispatch) {
    const response = await request.get(`${API_CARRIER}/${userid}/policies`);
    const policies = response.data.map((policy, index) => {
      return {
        ...policy,
        key: index + 1,
      };
    });
    dispatch(policiesSummary(policies));
  };
}
