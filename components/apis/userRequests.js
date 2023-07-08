import { OK } from "../utils/constants"
import makeRequest from "./makeRequest"
import { FORGOT_PASSWORD_VERIFY_OTP, SEND_FORGOT_PASSWORD_OTP, UPDATE_PASSWORD_FORGOT } from "./taskApis"
import { toast } from "../utils/toast"

export const sendForgotPasswordEmail = async (email) => {
    const response = await makeRequest(SEND_FORGOT_PASSWORD_OTP + "/" + email)
    const data = await response.json()

    if (response.status !== OK) {
        toast(data.message)
        return
    }

    toast(data.message)
    return data
}

export const verifyOtp = async (user) => {
    const response = await makeRequest(FORGOT_PASSWORD_VERIFY_OTP, user, 'POST')
    const data = await response.json()

    if (response.status !== OK) {
        toast(data.message)
        return
    }

    toast('OTP verified successfully')
    return data
}

export const updateForgotPassword = async (user) => {
    const response = await makeRequest(UPDATE_PASSWORD_FORGOT, user, 'POST')
    const data = await response.json()

    if (response.status !== OK) {
        toast(data.message)
        return
    }

    toast(data.message)
    return data
}