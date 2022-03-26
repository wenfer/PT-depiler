import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import ContentVue from './components/Layout/Content.vue';

function dynamicImportView (view: string) {
  return import(/* webpackChunkName: "views/[request]" */ `./views/${view}.vue`);
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Overview',
    meta: { isMainMenu: true },
    component: ContentVue,
    children: [
      {
        path: '/my-data',
        name: 'MyData',
        alias: '',
        meta: { icon: 'mdi-view-dashboard' },
        component: () => dynamicImportView('Overview/MyData')
      },
      {
        path: '/search-data',
        name: 'SearchData',
        meta: { icon: 'mdi-magnify' },
        component: () => dynamicImportView('Overview/SearchData')
      },
      /**{
        path: '/my-client',
        name: 'MyClient',
        meta: { icon: 'mdi-download-network' },
        component: () => dynamicImportView('Overview/MyClient')
      },*/
      {
        path: '/my-collection',
        name: 'MyCollection',
        meta: { icon: 'mdi-heart' },
        component: () => dynamicImportView('Overview/MyCollection')
      },
      {
        path: '/search-result-snapshot',
        name: 'SearchResultSnapshot',
        meta: { icon: 'mdi-camera-plus' },
        component: () => dynamicImportView('Overview/SearchResultSnapshot')
      },
      {
        path: '/download-history',
        name: 'DownloadHistory',
        meta: { icon: 'mdi-history' },
        component: () => dynamicImportView('Overview/DownloadHistory')
      },
      {
        path: '/keep-upload-task',
        name: 'KeepUploadTask',
        meta: { icon: 'mdi-call-merge' },
        component: () => dynamicImportView('Overview/KeepUploadTask')
      }
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: { isMainMenu: true },
    component: ContentVue,
    children: [
      {
        path: '/set-base',
        name: 'setBase',
        meta: { icon: 'mdi-cog' },
        component: () => dynamicImportView('Settings/setBase')
      },
      {
        path: '/set-site',
        name: 'setSite',
        meta: { icon: 'mdi-earth' },
        component: () => dynamicImportView('Settings/setSite')
      },
      {
        path: '/set-search-solution',
        name: 'setSearchSolution',
        meta: { icon: 'mdi-widgets' },
        component: () => dynamicImportView('Settings/setSearchSolution')
      },
      /**{
        path: '/set-client',
        name: 'setClient',
        meta: { icon: 'mdi-cloud-download' },
        component: () => dynamicImportView('Settings/setClient')
      },*/
      {
        path: '/set-download-paths',
        name: 'setDownloadPaths',
        meta: { icon: 'mdi-folder-open' },
        component: () => dynamicImportView('Settings/setDownloadPaths')
      },
      {
        path: '/set-backup',
        name: 'setBackup',
        meta: { icon: 'mdi-backup-restore' },
        component: () => dynamicImportView('Settings/setBackup')
      }
    ]
  },

  {
    path: '/about',
    name: 'About',
    meta: { isMainMenu: true, keepAlive: true },
    component: ContentVue,
    children: [
      {
        path: '/technology-stack',
        name: 'TechnologyStack',
        meta: { icon: 'mdi-developer-board' },
        component: () => dynamicImportView('About/TechnologyStack')
      }, 
      {
        path: '/change-log',
        name: 'ChangeLog',
        meta: { icon: 'TrackChangesSharp' },
        component: () => dynamicImportView('About/ChangeLog')
      },
      /**{
        path: '/dev-team',
        name: 'DevTeam',
        meta: { icon: 'PeopleSharp' },
        component: () => dynamicImportView('About/DevTeam')
      },*/
      /**{
        path: '/donate',
        name: 'Donate',
        meta: { icon: 'FreeBreakfastSharp' },
        component: () => dynamicImportView('About/Donate')
      }*/
    ]
  },
  {
    path: '/devtools',
    name: 'Devtools',
    meta: { isMainMenu: true },
    component: ContentVue,
    children: [
      {
        path: '/system-log',
        name: 'SystemLog',
        meta: { icon: 'mdi-clipboard-text' },
        component: () => dynamicImportView('Devtools/SystemLog')
      },
      {
        path: '/debugger',
        name: 'Debugger',
        meta: { icon: 'mdi-bug' },
        component: () => dynamicImportView('Devtools/Debugger')
      }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/' }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
