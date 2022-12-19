module.exports = ({nextMiddleware, next, store}) => {
    let isLoggedIn = store.state.auth.isAuth
    if (isLoggedIn) {
        return next("/")
    }

    return nextMiddleware();
}
