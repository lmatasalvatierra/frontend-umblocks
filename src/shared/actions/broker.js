import request from 'axios';
import UrlConstants from '../constant/url-constants';
import { CERTIFICATE_SUBMIT } from '../constant/ActionTypes';

const API_URL = UrlConstants(process.env.API_BASE_URL).CERTIFICATE

function certificateSubmit(certificate) {
  return {
    type: CERTIFICATE_SUBMIT,
    payload: certificate,
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
