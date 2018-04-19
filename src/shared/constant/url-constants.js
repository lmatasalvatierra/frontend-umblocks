/**
 * Class to define constants of the application
 * @class Constants
 */

export default baseAPIUrl => {
  const URLConstants = {};

  URLConstants.BASE = baseAPIUrl || 'http://localhost:3409';
  URLConstants.TOOLTIP_PATH = `${URLConstants.BASE}/api/v1/tooltip`;

  return URLConstants;
};
