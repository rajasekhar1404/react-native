import { ToastAndroid } from "react-native"

export const isPropertyValid = (value, name) => {
    if (!value || value.trim().length <= 0) {
        ToastAndroid.show(name + ' is required', ToastAndroid.SHORT)
        return
    }
    return value.trim()
}

export const isValidOTP = (otp) => {
    if (!otp || otp === NaN || otp < 100000 || otp > 999999) {
        ToastAndroid.show('otp is not valid', ToastAndroid.SHORT)
        return
    }
    return otp
}