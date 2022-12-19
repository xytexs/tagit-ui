import {FrontendApi, Configuration} from '@ory/client'
import {handleError, mapPassword, mapCSRFToken, mapIdentifier} from '@/api/identity/utils'

const conf = new Configuration({
    basePath: "https://auth.tagitai.com",
    baseOptions: {
        withCredentials: true,
    },
});

const client = () => {
    return new FrontendApi(conf)
}

export const getSingUpData = async () => {
    const {data} = await client().createBrowserRegistrationFlow()
    return {
        flowId: data.id,
        csrfToken: mapCSRFToken(data.ui),
        fields: {
            ...mapIdentifier(data.ui),
            ...mapPassword(data.ui)
        },
    }
}

export const postSignUp = async ({flowId, csrfToken, password, traits}) => {
    try {
        const {data} = await client().updateRegistrationFlow({
            flow: flowId,
            updateRegistrationFlowBody: {
                csrf_token: csrfToken,
                method: 'password',
                password,
                traits
            }
        })
        return data
    } catch (e) {
        handleError(e)
    }
}

export const postGoogleSignup = async (
    {flowId, csrfToken}
) => {
    try {
        const {data} = await client().updateRegistrationFlow({
            flow: flowId,
            updateRegistrationFlowBody: {
                csrf_token: csrfToken,
                provider: 'google',
                // password,
                // traits
            }
        })
        return data
    } catch (e) {
        handleError(e)
    }
}

export const getSession = async () => {
    try {
        const {data} = await client().toSession()

        return data
    } catch (e) {
        handleError(e)
    }
}

export const sendLogoutRequest = async () => {
    try {
        const {data} = await client().createBrowserLogoutFlow()

        return data
    } catch (e) {
        handleError(e)
    }
}

export const getSignInData = async () => {
    const {data} = await client().createBrowserLoginFlow()

    return {
        flowId: data.id,
        csrfToken: mapCSRFToken(data.ui),
        fields: {
            ...mapIdentifier(data.ui),
            ...mapPassword(data.ui)
        },
    }
}

export const postSignIn = async (
    {
        flowId,
        csrfToken,
        identifier,
        password,
    }
) => {
    try {
        const {data} = await client().updateLoginFlow({
            flow: flowId,
            updateLoginFlowBody: {
                csrf_token: csrfToken,
                identifier,
                method: 'password',
                password,
            }
        })

        return data
    } catch (e) {
        handleError(e)
    }
}

export const getProfileSettingsData = async () => {
    const {data} = await client().createBrowserSettingsFlow()
    return {
        flowId: data.id,
        csrfToken: mapCSRFToken(data.ui),
    }
}

export const putProfileSettings = async (flowId, {csrfToken, traits}) => {
    try {
        console.log(flowId, {csrfToken, traits})
        const {data} = await client().updateVerificationFlow({
            flow: flowId,
            updateVerificationFlowBody: {
                csrf_token: csrfToken,
                method: 'profile',
                traits,
            }
        })

        return data
    } catch (e) {
        handleError(e)
    }
}

export const getPasswordChangeData = async () => {
    const {data} = await client().createBrowserSettingsFlow()
    return {
        flowId: data.id,
        csrfToken: mapCSRFToken(data.ui),
    }
}


export const putPasswordChange = async (flowId, {csrfToken, password}) => {
    try {
        const {data} = await client().updateVerificationFlow({
            flow: flowId,
            updateVerificationFlowBody: {
                csrf_token: csrfToken,
                method: 'password',
                password,
            },
        })

        return data
    } catch (e) {
        handleError(e)
    }
}

export const getResetPasswordData = async () => {
    const {data} = await client().createBrowserRecoveryFlow()
    return {
        flowId: data.id,
        csrfToken: mapCSRFToken(data.ui),
    }
}

export const postResetPassword = async ({flowId, email, csrfToken}) => {
    try {
        const {data} = await client().updateRecoveryFlow(
            {
                flow: flowId,
                updateRecoveryFlowBody: {
                    csrf_token: csrfToken,
                    email,
                    method: 'link',
                },
            });
        console.log(data)

        return data
    } catch (e) {
        handleError(e)
    }
}
