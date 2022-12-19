module.exports = ({nextMiddleware, next, store}) => {
    let isLoggedIn = store.state.auth.isAuth
    console.log("IS LOGGED IN", isLoggedIn)
    if (!isLoggedIn) {
        return next('/login')
    }

    return nextMiddleware()
}
