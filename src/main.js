import {createApp} from 'vue'
import App from './App.vue'

import './css/index.scss'
import 'flowbite';

import router from '@/routes/router.js'
import store from '@/store'
import {middlewarePipeline} from "@/middleware";


const bootstrap = async () => {
    await store.dispatch('auth/setUserSession')

    router.beforeEach((to, from, next) => {
        if (!to.meta.middleware) {
            return next()
        }

        const middleware = to.meta.middleware;
        const context = {
            to,
            from,
            next,
            router,
            store
        }

        const res = middleware[0]({
            ...context,
            nextMiddleware: middlewarePipeline(context, middleware, 1)
        })

        console.log(res)
    })

    createApp(App)
        .use(store)
        .use(router)
        .mount('#app')
}

export default bootstrap()
