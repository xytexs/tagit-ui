import {
    getSession,
    postSignIn,
    sendLogoutRequest,
    postSignUp,
} from "@/api/identity";

const state = {
    isAuth: false,
    session: {
        id: '',
        expiresAt: null,
        sessionType: '',
    },
    user: {},
}

const getters = {
    getUserEmailFirstLetter: (state) => {
        return state.user.email.slice(0, 1).toUpperCase()
    }
}

const actions = {
    registerUser: async ({commit}, {
        csrfToken,
        flowId,
        password,
        email,
    }) => {
        const resp = await postSignUp({
            flowId,
            csrfToken,
            password,
            traits: {
                email
            },
        })

        const {id, expires_at: expiresAt, identity} = resp.session

        const session = {expiresAt, id}
        const user = {
            id: identity.id,
            email: identity.traits.email,
        }

        await commit('setIsAuth')
        await commit('setUser', user)
        await commit('setSession', session)
    },

    loginUser: async ({commit}, {
        flowId,
        email: identifier,
        password,
        csrfToken
    }) => {
        const resp = await postSignIn({
            flowId,
            csrfToken,
            identifier,
            password,
        })

        const {id, expires_at: expiresAt, identity} = resp.session

        const session = {expiresAt, id}
        const user = {
            id: identity.id,
            email: identity.traits.email,
        }

        await commit('setIsAuth')
        await commit('setUser', user)
        await commit('setSession', session)
    },

    // changeUserData: async ({commit}, {flowId, csrfToken, traits}) => {
    //     const {identity} = await sendSaveProfileRequest(flowId, {csrfToken, traits})
    //     const user = {
    //         id: identity.id,
    //         email: identity.traits.email,
    //     }
    //
    //     await commit('setUser', user)
    // },

    logoutUser: async () => {
        const resp = await sendLogoutRequest()

        window.location = resp.logout_url
    },

    setUserSession: async ({commit}) => {
        try {
            const {id, expires_at: expiresAt, identity, authentication_methods} = await getSession()
            const session = {expiresAt, id, sessionType: authentication_methods[0].method}
            const user = {
                id: identity.id,
                email: identity.traits.email,
            }

            await commit('setIsAuth')
            await commit('setUser', user)
            await commit('setSession', session)
        } catch (e) {
            console.log(e)
        }
    }
}

const mutations = {
    setIsAuth: (state) => {
        state.isAuth = true
    },

    setUser: (state, user) => {
        state.user = user
    },

    setSession: (state, session) => {
        state.session = session
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
