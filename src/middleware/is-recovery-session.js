module.exports = ({nextMiddleware, store, next}) => {
    console.log('recovery middleware', store.state.auth.session.sessionType === 'link_recovery')
    if (store.state.auth.session.sessionType === 'link_recovery') {
        return next('/confirm-reset-password')
    }

    return nextMiddleware()
}
