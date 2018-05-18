/**
 * Class to define constants of the application
 * @class Constants
 */

export default baseAPIUrl => {
  const URLConstants = {};

  URLConstants.BASE = baseAPIUrl || 'http://localhost:4308';
  URLConstants.TEST = `${URLConstants.BASE}/api/test`;
  URLConstants.LOGIN = `${URLConstants.BASE}/api/v1/login`;
  URLConstants.POLICY = `${URLConstants.BASE}/api/v1/policy`;
  URLConstants.POLICIES = `${URLConstants.BASE}/api/v1/policies`;
  URLConstants.CARRIER = `${URLConstants.BASE}/api/v1/carrier`;
  URLConstants.CERTIFICATE = `${URLConstants.BASE}/api/v1/certificate`;
  URLConstants.BROKER = `${URLConstants.BASE}/api/v1/broker`;
  URLConstants.OWNER = `${URLConstants.BASE}/api/v1/owner`;

  return URLConstants;
};
