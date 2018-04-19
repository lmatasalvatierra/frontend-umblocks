import KoaRouter from 'koa-router';
import koaPassport from 'koa-passport';
import AuthCookieSession from '../core/authCookieSession';

/**
 * The `authRouter` instance implements the endpoints related with the
 * SSO authentication via auth0.
 */
const authRouter = new KoaRouter();

/**
 * The `/agent/login` endpoint is used for initiating the authentication
 * process via auth0. It will redirect the user to their domain and will
 * return to the `/agent/callback` endpoint including the parameters
 * needed for initializating the session.
 */
authRouter.get(
  'agent-login',
  '/agent/login',
  koaPassport.authenticate('auth0'),
);

/**
 * `/agent/logout` is used by the application to logout users.
 * In addition to the logout via passport-koa we will delete
 * the cookie `is_agent` that we use to determine if the user is
 * logged in across our different web applications.
 */
authRouter.get('agent-logout', '/agent/logout', async ctx => {
  ctx.logout();
  AuthCookieSession.destroy(ctx);
  if (ctx.session.quote) {
    ctx.session.quote.authSession = {};
  }
  ctx.redirect('/');
});

/**
 * `/callback` is used as a redirect url once the `/agent/login` endpoint
 * process is completed and we receive a response redirect by auth0 that
 * contains the token that we'll use for initializing the user.
 * We are, in addition, going to create the `is_agent` cookie.
 */
authRouter.get('agent-callback', '/callback', ctx => {
  return koaPassport.authenticate('auth0', (err, user) => {
    if (err) {
      throw new Error(
        'AuthRouter: Can not login after success authenticate callback.',
      );
    }

    ctx.login(user, () => {
      if (ctx.isAuthenticated()) {
        AuthCookieSession.create(ctx);
      }

      return ctx.redirect('/?agent_logged=1');
    });
  })(ctx);
});

/**
 * `/agent/session` tells us if there is an active session.
 */
authRouter.get('/agent/session', ctx => {
  if (ctx.isAuthenticated()) {
    ctx.body = {
      isAuthenticated: ctx.isAuthenticated(),
      username: ctx.state.user.nickname,
      email: ctx.state.user.displayName,
    };
  }
});

export default authRouter;
