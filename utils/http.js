import axios from 'axios'
import environment from "./environment_variables"

export const GET = async (url, body) => {
    return (await axios.get(environment.api + url, body)).data;
}

export const POST = async (url, body) => {
    return (await axios.post(environment.api + url, body)).data;
}

export const PUT = async (url, body) => {
    return (await axios.put(environment.api + url, body)).data;
}

export const DELETE = async (url, body) => {
    return (await axios.put(environment.api + url, body)).data;
}
