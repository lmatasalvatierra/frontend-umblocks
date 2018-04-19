import appRoutes from './appRouter';

it('The router contains the basic routes', () => {
  const testRoute = appRoutes.route('test');
  expect(testRoute.name).toBe('test');
  expect(testRoute.methods[0]).toBe('HEAD');
  expect(testRoute.methods[1]).toBe('GET');
});
