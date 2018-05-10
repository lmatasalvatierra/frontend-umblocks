import request from 'axios';
import { history } from 'client/store';
import UrlConstants from '../constant/url-constants';
import {
  CERTIFICATE_SUBMIT,
  CERTIFICATE_VIEW,
  CERTIFICATES_SUMMARY,
  CERTIFICATES_SUMMARY_OWNER,
  CERTIFICATES_SUMMARY_BEGIN,
} from '../constant/ActionTypes';

const API_URL = UrlConstants(process.env.API_BASE_URL).CERTIFICATE;
const API_BROKER = UrlConstants(process.env.API_BASE_URL).BROKER;
const API_OWNER = UrlConstants(process.env.API_BASE_URL).OWNER;

function certificatesSummaryBegin() {
  return {
    type: CERTIFICATES_SUMMARY_BEGIN,
  };
}

function certificateSubmit(certificate) {
  return {
    type: CERTIFICATE_SUBMIT,
    payload: certificate,
  };
}

function certificateView(policy) {
  return {
    type: CERTIFICATE_VIEW,
    payload: policy,
  };
}

function certificatesSummary(certificates) {
  return {
    type: CERTIFICATES_SUMMARY,
    payload: certificates,
  };
}

function certificatesSummaryOwner(certificates) {
  return {
    type: CERTIFICATES_SUMMARY_OWNER,
    payload: certificates,
  };
}

export function submittingCertificate(certificate) {
  return async function(dispatch) {
    const result = await request.post(API_URL, {
      effective_date: certificate.effectiveDate.format('X'),
      owner_email: certificate.email,
      user_id: certificate.user_id,
      policies: certificate.policies,
    });
    dispatch(certificateSubmit(result));
  };
}

export function viewingCertificate(certificateid, userid) {
  return async function(dispatch) {
    const result = await request.get(`${API_URL}/${certificateid}`);
    dispatch(certificateView(result));
    history.push(`${userid}/certificate/${certificateid}`);
  };
}

export function gettingCertificatesSummary(userid) {
  return async function(dispatch) {
    dispatch(certificatesSummaryBegin());
    const response = await request.get(`${API_BROKER}/${userid}/certificates`);
    const certificates = response.data.map((certificate, index) => {
      return {
        ...certificate,
        key: index + 1,
      };
    });
    dispatch(certificatesSummary(certificates));
  };
}

export function gettingCertificatesSummaryOwner(userid) {
  return async function(dispatch) {
    dispatch(certificatesSummaryBegin());
    const response = await request.get(`${API_OWNER}/${userid}/certificates`);
    const certificates = response.data.map((certificate, index) => {
      return {
        ...certificate,
        key: index + 1,
      };
    });
    dispatch(certificatesSummaryOwner(certificates));
  };
}
