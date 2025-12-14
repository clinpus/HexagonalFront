
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ADFG6W66.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4BIGDEHH.js",
      "chunk-ULVUAOX6.js"
    ],
    "route": "/invoices"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ORLVPGWZ.js",
      "chunk-ULVUAOX6.js"
    ],
    "route": "/customers"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YQ5HTF5Q.js"
    ],
    "route": "/login"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23716, hash: '07e24473113c9e9a58857fb82d5bd9a69a43ae563654acbac8b13bbe54df81e3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17290, hash: '7306385c77497f6b35aedeec8d4a433fea20c27108bad265a291dbb1fdfdbc59', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'customers/index.html': {size: 27877, hash: '7b34f23663889df95bc7f292a1a7b4481e2a89a75138576669e0d71c2fefcb8e', text: () => import('./assets-chunks/customers_index_html.mjs').then(m => m.default)},
    'invoices/index.html': {size: 27877, hash: '60ded49f99468c0e92dbd3b9ddfbedf86d63bb31f96a6b67351a7fbe5b43fcc1', text: () => import('./assets-chunks/invoices_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 27825, hash: 'a3fe3985a52528455cdfa137b66c329a7d75953bfc077151a7e1db386d7ab080', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 28600, hash: '31edc934391d86fdbe2437fc7a0cc147fb1dfe1c09190e8c56e9f37c82484f23', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
