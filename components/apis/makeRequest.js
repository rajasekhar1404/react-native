import AsyncStorage from "@react-native-async-storage/async-storage"
import { FORBIDDEN, UNAUTHORIZED } from "../utils/constants"

const makeRequest = async (url, body, type, headers) => {
    let fetchOptions = {}

    if (type) {
        fetchOptions.method = type
    } else {
        fetchOptions.method = 'GET'
    }

    if (body) {
        fetchOptions.body = JSON.stringify(body)
    }

    if (headers) {
        fetchOptions.headers = headers
    } else {
        fetchOptions.headers = {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${await AsyncStorage.getItem('key')}`
        }
    }

    const response = await fetch(url, fetchOptions)

    if (response.status === UNAUTHORIZED || response.status === FORBIDDEN) {
        AsyncStorage.clear()
        return
    }

    return response

}

export default makeRequest