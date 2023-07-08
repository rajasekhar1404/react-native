import { useState, useContext } from "react"
import { View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native"
import { LOGIN } from "../apis/taskApis"
import { OK } from "../utils/constants"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginContext } from "../utils/contextStore"
import { styles } from "../styles/authentication"
import ForgotPassword from "./forgotPassword"

const Login = ({ setSignup }) => {

    const { setKey } = useContext(LoginContext)

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [forgotPassword, setForgotPassword] = useState(false)

    const loginHandler = async () => {
        const response = await fetch(LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (response.status === OK) {
            const data = await response.json()
            await AsyncStorage.setItem('key', data.key)
           setKey(data.key)
        } else {
            console.log('invalid credentials')
        }
    }

    return (
            <View style={[styles.card, styles.formContainer]}>
                {
                    forgotPassword ? <ForgotPassword setForgotPassword={setForgotPassword}/> : <>
                        <Text style={styles.heading}>Login</Text>
                        <TextInput 
                            style={styles.inputContainer}
                            placeholder="Enter your email"
                            onChangeText={text => setUser({...user, email: text})}
                            />
                        <TextInput 
                            style={styles.inputContainer}
                            secureTextEntry={true}
                            placeholder="Enter your password"
                            onChangeText={text => setUser({...user, password: text})}
                            />
                        <View style={styles.buttonContainer}>
                        <Button 
                            title="Login"
                            onPress={loginHandler}
                            />
                        </View>
                        <Pressable onPress={() => {setForgotPassword(true)}} ><Text style={styles.regInLogin}>Forgot password</Text></Pressable>
                        <Text style={styles.loginToRegister}>Still not registered? <Pressable onPress={() => {setSignup(true)}} ><Text style={styles.regInLogin}>Register now</Text></Pressable></Text>
                    </>
                }
            </View>
    )
}

export default Login