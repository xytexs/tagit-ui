import axios from "axios";

const client = () => {
    return new axios.create({
        baseURL: 'https://tagitai.com/api',
        withCredentials: true
    })
}

export const getRecords = async () => {
    return await client().get('/records')
}

export const createRecord = async ({text, html}) => {
    return await client().post('/records', {
        text,
        html,
    })
}

export const getRecordByID = async (id) => {
    return await client().get('/records/' + id)
}

export const getTagsInfo = async () => {
    return await client().get('/tags/info')
}
