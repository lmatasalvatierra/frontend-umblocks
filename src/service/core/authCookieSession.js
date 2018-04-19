/**
 * Encapsulates the functionality in charge of setting auth cookies.
 */
const AuthCookieSession = {
  /**
   * @type {String} NAME
   */
  NAME: 'is_agent',

  /**
   * @type {String} MY_CW_AUTH
   */
  MY_CW_AUTH: 'user_auth',

  /**
   * @type {String} MY_CW_ADMIN_AUTH
   */
  MY_CW_ADMIN_AUTH: 'user_admin_auth',

  /**
   * @type {String} DOMAIN
   */
  DOMAIN: process.env.HOST,

  /**
   * @param {KoaRequest} ctx
   */
  create(ctx) {
    ctx.cookies.set(this.NAME, '1', { domain: this.DOMAIN, sign: false });
  },

  /**
   * @param {KoaRequest} ctx
   */
  get(ctx) {
    return ctx.cookies.get(this.NAME);
  },

  /**
   * @param {KoaRequest} ctx
   */
  destroy(ctx) {
    const options = { domain: this.DOMAIN, overwrite: true };
    ctx.cookies.set(this.NAME, null, options);
    ctx.cookies.set(this.MY_CW_AUTH, null, options);
    ctx.cookies.set(this.MY_CW_ADMIN_AUTH, null, options);
  },
};

export default AuthCookieSession;
