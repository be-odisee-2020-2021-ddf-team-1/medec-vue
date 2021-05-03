import Vue from 'vue'
import VueRouter from 'vue-router'
import Overview from "../views/Overview"
import Create from "../views/Create"
import Details from "../views/Edit"
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import NewWaardebon from "../components/NewWaardebon";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Overview',
        component: Overview
    },
    {
        path: '/Waardebon',
        name: 'Waardebon',
        component: NewWaardebon
    },
    {
        path: '/Create',
        name: 'Create',
        component: Create
    },
    {
        path: '/Details/:besteldToestelId',
        name: 'details',
        component: Details
    },
    {
        path: '/BesteldToestel/:entryId',
        name: 'BesteldToestelEdit',
        component: Overview,
        props: true
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
export default router
