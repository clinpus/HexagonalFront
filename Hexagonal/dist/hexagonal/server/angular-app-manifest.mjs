
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
      "chunk-LHN6WO3O.js",
      "chunk-Y5RXBEQA.js"
    ],
    "route": "/invoices"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-FXFKRHZE.js",
      "chunk-Y5RXBEQA.js"
    ],
    "route": "/custmers"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-NDG764M3.js"
    ],
    "route": "/login"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23665, hash: 'b12a638c14bfed45809a880f4e6b6717089615e23bdb6ad150823881463bd6d3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17239, hash: '119c9301667537f5de9aff438c3144fc889cafd3f9bb5ea6875a2cf8032cba12', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'invoices/index.html': {size: 26158, hash: '0e23d82725a525e9eef418e766fdc26858778d6ff8549baf572db83524617f7b', text: () => import('./assets-chunks/invoices_index_html.mjs').then(m => m.default)},
    'custmers/index.html': {size: 26179, hash: 'dd37beb0b207af87a7d7f49e8120873c7d67e2c21072bba6e93d9d0c183cba98', text: () => import('./assets-chunks/custmers_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 27216, hash: '98fec4069029a6314b23b42de8dfe8195e43d5db151eb99dcb5aa53479a91393', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
