import { View, Text, TextInput, Button, ToastAndroid } from "react-native"
import { styles } from "../styles/authentication"
import { useState } from "react"
import { isPropertyValid, isValidOTP } from "../utils/stringValidator"
import { sendForgotPasswordEmail, updateForgotPassword, verifyOtp } from "../apis/userRequests"

const ForgotPassword = ({ setForgotPassword }) => {

    const [user, setUser] = useState({
        email: '',
        otp: 0,
        password: '',
        isOtpValid: false,
        isOtpSent: false
    })

    const changeHandler = (text, name) => {
        setUser({
            ...user,
            [name]: text
        })
    }

    const sendOtpMail = async () => {
        let email = isPropertyValid(user.email, 'email')
        if (!email) return
        const response = await sendForgotPasswordEmail(email)
        if (!response) return
        setUser({ ...user, email: email, isOtpSent: true })
    }

    const verifyOtpHandler = async () => {
        let otp = isValidOTP(user.otp)
        if (!otp) return
        const response = await verifyOtp(user)
        if (!response) return
        setUser({ ...user, isOtpValid: true })
    }

    const updatePasswordHandler = async () => {
        let password = isPropertyValid(user.password, 'password')
        if (!password) return
        const response = await updateForgotPassword(user)
        if (!response) return
        setForgotPassword(false)
    }

    const cancelHandler = () => {
        setForgotPassword(false)
    }

    return (
        <>
            <Text style={styles.heading}>Forgot Password</Text>
            {
                user.isOtpSent ? <>
                        {
                            user.isOtpValid ? <>
                                <TextInput 
                                    style={styles.forgotInputContainer}
                                    placeholder="Enter new password"
                                    onChangeText={text => changeHandler(text, 'password')}
                                />
                                <View style={styles.buttonContainer}>
                                    <Button 
                                        title="Cancel"
                                        onPress={cancelHandler}
                                    />
                                    <Button 
                                        title="Update"
                                        onPress={updatePasswordHandler}
                                    />
                                </View>
                            </> : <>
                                <TextInput 
                                    style={styles.forgotInputContainer}
                                    placeholder="Enter your otp"
                                    keyboardType="numeric"
                                    onChangeText={text => changeHandler(Number.parseInt(text), 'otp')}
                                />
                                <View style={styles.buttonContainer}>
                                    <Button 
                                        title="Cancel"
                                        onPress={cancelHandler}
                                    />
                                    <Button 
                                        title="Verify"
                                        onPress={verifyOtpHandler}
                                    />
                                </View>
                            </>
                        }
                    </> : <>
                    <TextInput 
                        style={styles.forgotInputContainer}
                        placeholder="Enter your email"
                        onChangeText={ text => changeHandler(text, 'email')}
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Cancel"
                            onPress={cancelHandler}
                        />
                        <Button 
                            title="Send OTP"
                            onPress={sendOtpMail}
                        />
                    </View>
                </>
            }
        </>
    )
}

export default ForgotPassword