import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';

interface IRoute {
  path: string;
  component: Promise<any>;
  breadcrumbName?: string;
  exact?: boolean;
}

const router = [
  {
    path: '/',
    component: import('../pages/Home'),
  },
  {
    path: '/about',
    component: import('../pages/About'),
  },
  {
    path: '/user',
    component: import('../pages/User'),
  },
];

function LoadRoute(config: IRoute[]) {
  return config.map((route) => {
    return {
      key: route.path,
      path: route.path,
      exact: typeof route.exact === 'undefined' ? true : route.exact,
      component: loadable(() => pMinDelay(route.component, 200)),
    };
  });
}

export default LoadRoute(router);
