const state = {
    messages: []
}

const getters = {
    getMessages: (state) => {
        return state.messages
    }
}

const actions = {
    createTemporaryMessage({commit}, msg) {
        commit('pushMessage', msg)
        setTimeout(() => {
            commit('removeFirstMessage')
        }, 5000)
    }
}

const mutations = {
    pushMessage(state, {message, type}) {
        state.messages.push({
            message,
            type
        })
    },
    removeFirstMessage(state) {
        state.messages.shift()
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
