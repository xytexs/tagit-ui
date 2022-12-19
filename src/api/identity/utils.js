// import {FormValidationError} from "@/api/errors";
import _ from 'lodash'

export const handleError = (error) => {
    console.log(error.response)
    switch (error.response.status) {
        case 400:
            handleFormErrors(error.response.data)
            break
        default:
            throw new Error(error.response.data.error.reason)
    }
}

export const handleFormErrors = (data) => {
    if (data.ui) {
        if (data.ui.messages && data.ui.messages[0] !== undefined) {
            throw new Error(data.ui.messages[0].text)
        }

        data.ui.nodes.map(({messages}) => {
            if (messages[0] !== undefined) {
                throw new Error(messages[0].text)
            }
        })
    }

    if (data.error) {
        throw new Error(data.error.reason)
    }
}
export const mapIdentifier = ({nodes}) => {
    return _.chain(nodes)
        .filter(({attributes}) => {
            return !!attributes.name.includes('identifier');
        })
        .keyBy(() => {
            return 'email'
        })
        .mapValues(({attributes, messages}) => {
            return {
                type: 'identifier',
                name: 'Email',
                value: attributes.value === undefined ? '' : attributes.value,
                error: messages[0] === undefined ? null : messages[0].text
            }
        })
        .value();

}

export const mapTraits = ({nodes}) => {
    return _.chain(nodes)
        .filter(({attributes}) => {
            return !!attributes.name.includes('traits');
        })
        .keyBy(({attributes}) => {
            return attributes.name.split('.')[1]
        })
        .mapValues(({meta, attributes, messages}) => {
            return {
                type: 'traits',
                name: meta.label.text,
                value: attributes.value === undefined ? '' : attributes.value,
                error: messages[0] === undefined ? null : messages[0].text
            }
        })
        .value();

}

export const mapPassword = ({nodes}) => {
    return _.chain(nodes)
        .filter(({attributes}) => {
            return !!attributes.name.includes('password');
        })
        .keyBy(({attributes}) => {
            return attributes.name
        })
        .mapValues(({meta, attributes, messages}) => {
            return {
                type: 'password',
                name: meta.label.text,
                value: attributes.value === undefined ? '' : attributes.value,
                error: messages[0] === undefined ? null : messages[0].text
            }
        })
        .value();
}

export const mapEmail = ({nodes}) => {
    return _.chain(nodes)
        .filter(({attributes}) => {
            return !!attributes.name.includes('email');
        })
        .keyBy(({attributes}) => {
            return attributes.name
        })
        .mapValues(({meta, attributes, messages}) => {
            return {
                type: 'email',
                name: meta.label.text,
                value: attributes.value === undefined ? '' : attributes.value,
                error: messages[0] === undefined ? null : messages[0].text
            }
        })
        .value();
}

export const mapCSRFToken = ({nodes}) => {
    let value;
    nodes.forEach(({attributes}) => {
        if (attributes.name === 'csrf_token') {
            value = attributes.value
        }
    })

    return value
}
