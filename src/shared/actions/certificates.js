import request from 'axios';
import { history } from 'client/store';
import UrlConstants from '../constant/url-constants';
import { CERTIFICATE_SUBMIT, CERTIFICATE_VIEW } from '../constant/ActionTypes';

const API_URL = UrlConstants(process.env.API_BASE_URL).CERTIFICATE;

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

export function submittingCertificate(certificate) {
  return async function(dispatch) {
    const result = await request.post(API_URL, {
      effective_date: certificate.effectiveDate.format('X'),
      owner_email: certificate.email,
      policies: certificate.policies,
    });
    dispatch(certificateSubmit(result));
  };
}

export function viewingCertificate(certificateid, userid) {
  return async function(dispatch) {
    const result = await request.get(`${API_URL}/${certificateid}`);
    dispatch(certificateView(result));
    history.replace(`${userid}/certificate/${certificateid}`);
  };
}
