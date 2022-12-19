const middlewarePipeline = (context, middleware, index) => {
    const nextMiddleware = middleware[index]
    console.log(nextMiddleware)
    if (!nextMiddleware) {
        return context.next
    }

    return () => {
        const nextPipeline = middlewarePipeline(
            context, middleware, index + 1
        )


        nextMiddleware({...context, next: nextPipeline})
    }
}

module.exports = middlewarePipeline
