/**
 * Class to define constants of the application
 * @class Constants
 */

export default baseAPIUrl => {
  const URLConstants = {};

  URLConstants.BASE = baseAPIUrl || 'http://localhost:4308';
  URLConstants.TEST = `${URLConstants.BASE}/api/test`;
  URLConstants.LOGIN = `${URLConstants.BASE}/api/v1/login`;

  return URLConstants;
};
