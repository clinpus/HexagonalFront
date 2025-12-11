
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
      "chunk-5KNRIXWS.js",
      "chunk-ULVUAOX6.js"
    ],
    "route": "/custmers"
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
    'index.csr.html': {size: 23716, hash: '7f73b9d8afcc1a66bef1dad4c38b4ca4f2fb520851d5f44770a01798f6f2fb7d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17290, hash: 'f21d99013e572ca8972f03d985db215667df629eed4053148ac9fb04255b4010', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'invoices/index.html': {size: 27885, hash: 'eb2fb1e4b6e9c89026732f71fc9ad07019aaa4753b391fe7eec021fe6126c6f3', text: () => import('./assets-chunks/invoices_index_html.mjs').then(m => m.default)},
    'custmers/index.html': {size: 27885, hash: 'c7a514e2edf0f4d0b48cc83225706ba6810ebe4e1aa34e4a7fdc1f680c20f8f7', text: () => import('./assets-chunks/custmers_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 27833, hash: '7e54db2bc772ec82401d20fe65a469f2fb87dddd78d0c4f5e5883908c0dd7f69', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 28608, hash: '354f10b8a2c72c6b6f031591c6294a411fc7b2702632298a2495f9ce3b04e569', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
