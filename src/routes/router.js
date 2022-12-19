import {createRouter, createWebHashHistory} from 'vue-router'
import {authMiddleware, guestMiddleware} from "@/middleware";


const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/auth/LoginPage'),
        meta: {
            layout: 'GuestLayout',
            middleware: [
                guestMiddleware
            ],
        }
    },
    {
        path: '/register',
        name: 'name',
        component: () => import('@/pages/auth/RegisterPage'),
        meta: {
            layout: 'GuestLayout',
            middleware: [
                guestMiddleware
            ],
        }
    },
    {
        path: '/',
        name: 'root',
        component: import('@/pages/note/CreatePage'),
        meta: {
            layout: 'MainLayout',
            middleware: [
                authMiddleware
            ],
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/pages/dashboard/DashboardPage'),
        meta: {
            layout: 'MainLayout',
            middleware: [
                authMiddleware
            ],
        }

    },
    {
        path: '/notes/:id/update',
        name: 'notes.update',
        component: () => import('@/pages/note/UpdatePage'),
        meta: {
            layout: 'MainLayout',
            middleware: [
                authMiddleware
            ],
        }
    },
    {
        path: '/notes/create',
        component: () => import('@/pages/note/CreatePage'),
        name: 'notes.create',
        meta: {
            layout: 'MainLayout',
            middleware: [
                authMiddleware
            ],
        }
    },
    {
        path: '/notes',
        name: 'notes.list',
        component: () => import('@/pages/note/ListPage'),
        meta: {
            layout: 'MainLayout',
            middleware: [
                authMiddleware
            ],
        }
    },
    {
        path: '/notes/:id',
        name: 'notes.view',
        component: () => import('@/pages/note/ViewPage'),
        meta: {
            layout: 'MainLayout',
            middleware: [
                authMiddleware
            ],
        }
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})

