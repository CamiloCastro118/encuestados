
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/encuestados/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/encuestados/home",
    "route": "/encuestados"
  },
  {
    "renderMode": 2,
    "route": "/encuestados/login"
  },
  {
    "renderMode": 2,
    "route": "/encuestados/home"
  },
  {
    "renderMode": 2,
    "route": "/encuestados/encuestas"
  },
  {
    "renderMode": 2,
    "route": "/encuestados/administrador"
  },
  {
    "renderMode": 2,
    "route": "/encuestados/directivo"
  },
  {
    "renderMode": 2,
    "redirectTo": "/encuestados/home",
    "route": "/encuestados/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1412, hash: '8dbb24da5db83c489efdd50662f530d46869a8bda5fca7c711f81bcd5948872d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1021, hash: 'adc5590c93836b1bafe8df3fa26ca73379dd0ed7f6642001172b1f7e9bf7aecd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 11641, hash: '0053483733ad2ff79e905c7aa9cea565b9d45fa31698e49383839e3508c430e4', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 6814, hash: '6f4954a82cce7dad507971548a5ac5e20c7d4eea0f0e71f53cc8736203649496', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'administrador/index.html': {size: 6814, hash: '6f4954a82cce7dad507971548a5ac5e20c7d4eea0f0e71f53cc8736203649496', text: () => import('./assets-chunks/administrador_index_html.mjs').then(m => m.default)},
    'directivo/index.html': {size: 6814, hash: '6f4954a82cce7dad507971548a5ac5e20c7d4eea0f0e71f53cc8736203649496', text: () => import('./assets-chunks/directivo_index_html.mjs').then(m => m.default)},
    'encuestas/index.html': {size: 6814, hash: '6f4954a82cce7dad507971548a5ac5e20c7d4eea0f0e71f53cc8736203649496', text: () => import('./assets-chunks/encuestas_index_html.mjs').then(m => m.default)},
    'styles-RZNBDFGK.css': {size: 2133, hash: 'ku12G0NJRZY', text: () => import('./assets-chunks/styles-RZNBDFGK_css.mjs').then(m => m.default)}
  },
};
