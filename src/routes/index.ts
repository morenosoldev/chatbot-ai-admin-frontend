import { lazy } from 'react';
import CreateAutomatisering from '../pages/CreateAutomatisering';

const Chatbots = lazy(() => import('../pages/Chatbots'));
const Chatbot = lazy(() => import('../pages/Chatbot'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Create = lazy(() => import('../pages/Create'));
const Settings = lazy(() => import('../pages/Settings'));
const Brugere = lazy(() => import('../pages/Brugere'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Automatiseringer = lazy(() => import('../pages/Automatiseringer'));

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
    path: '/automatiseringer',
    title: 'Automatiseringer',
    component: Automatiseringer,
  },
  {
    path: '/automatiseringer/:id',
    title: 'Opret automatiseringer',
    component: CreateAutomatisering,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
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
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
