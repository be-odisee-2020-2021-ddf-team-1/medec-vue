import Vue from 'vue'
import VueRouter from 'vue-router'
import Overview from "../views/Overview";
import Create from "../views/Create";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Overview',
        component: Overview
    },
    {
        path: '/Create',
        name: 'Create',
        component: Create
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
