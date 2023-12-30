import { lazy } from 'react';

const Chatbots = lazy(() => import('../pages/Chatbots'));
const Chatbot = lazy(() => import('../pages/Chatbot'));
const Create = lazy(() => import('../pages/Create'));
const Settings = lazy(() => import('../pages/Settings'));
const Brugere = lazy(() => import('../pages/Brugere'));

const coreRoutes = [
  {
    path: '/chatbots',
    title: 'Chatbots',
    component: Chatbots,
  },
  {
    path: '/chatbots/:id',
    title: 'Chatbot',
    component: Chatbot,
  },
  {
    path: '/create',
    title: 'Create',
    component: Create,
  },
  {
    path: '/brugere',
    title: 'Brugere',
    component: Brugere,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
];

const routes = [...coreRoutes];
export default routes;
