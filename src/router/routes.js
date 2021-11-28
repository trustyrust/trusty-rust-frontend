
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ]
  },
  {
    path: '/blog',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'getting-started', component: () => import('pages/Blog/GettingStarted.vue') },
      { path: 'setting-up-rust-in-vscode', component: () => import('pages/Blog/RustProject.vue') },
      { path: 'why-use-rust', component: () => import('pages/Blog/WhyRust.vue') },
      { path: 'fizzbuzz', component: () => import('pages/Blog/FizzBuzz.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
