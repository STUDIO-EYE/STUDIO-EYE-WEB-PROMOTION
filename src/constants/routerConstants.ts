// 추후에 진짜 PA, PP로 반영하여 추가

export const PA_ROUTES = {
  HOME: '/promotion-admin/home',
  REQUEST: '/promotion-admin/request',
  ARTWORK: '/promotion-admin/artwork',
  DATA_EDIT: '/promotion-admin/dataEdit',
  STATISTICS: '/promotion-admin/statistics',
  FAQ: '/promotion-admin/faq',
  SETTING: '/promotion-admin/setting',
};

export const PA_ROUTES_CHILD = {
  HOME: 'home',
  REQUEST: 'request',
  REQUEST_DETAIL: 'request/:id',
  ARTWORK: 'artwork',
  DATA_EDIT: 'dataEdit',
  STATISTICS: 'statistics',
  FAQ: 'faq',
  SETTING: 'setting',
};

export const PP_ROUTES_CHILD = {
  MAIN: '',
  ABOUT: 'about',
  REQUEST: 'request',
  ARTWORK: 'artwork',
  ARTWORK_DETAIL: 'artwork/:id',
  CONTACT: 'contact',
  FAQ: 'faq',
  LOGIN: 'login',
};

export const PP_ROUTES = {
  MAIN: '',
  ABOUT: '/about',
  REQUEST: '/request',
  ARTWORK: '/artwork',
  ARTWORK_DETAIL: 'artwork/:id',
  CONTACT: '/contact',
  FAQ: '/faq',
};
