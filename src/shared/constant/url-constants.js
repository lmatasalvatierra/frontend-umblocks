/**
 * Class to define constants of the application
 * @class Constants
 */

export default baseAPIUrl => {
  const URLConstants = {};

  URLConstants.BASE = baseAPIUrl || 'http://localhost:3408';
  URLConstants.TEST = `${URLConstants.BASE}/api/test`;

  return URLConstants;
};
