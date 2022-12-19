import {createStore, createLogger} from 'vuex'
import auth from './modules/auth'
import messages from './modules/messages'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        auth,
        messages
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
