import routes from '../../routes';

describe('Route Configuration', () => {
  it('should contain the correct number of routes', () => {
    expect(routes).toHaveLength(5);
  });

  it('should define specific paths and titles for all routes', () => {
    const expectedRoutes = [
      { path: '/chatbots', title: 'Chatbots' },
      { path: '/chatbots/:id', title: 'Chatbot' },
      { path: '/create', title: 'Create' },
      { path: '/brugere', title: 'Brugere' },
      { path: '/settings', title: 'Settings' },
    ];

    expectedRoutes.forEach((expectedRoute, index) => {
      expect(routes[index].path).toEqual(expectedRoute.path);
      expect(routes[index].title).toEqual(expectedRoute.title);
    });
  });

  it('should have a component for each route', () => {
    routes.forEach((route) => {
      expect(route.component).toBeDefined();
    });
  });
});
