import { useState, useContext } from "react"
import { View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native"
import { LOGIN } from "../apis/taskApis"
import { OK } from "../utils/constants"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginContext } from "../utils/contextStore"
import Signup from "./signup"

const Login = () => {

    const { setKey } = useContext(LoginContext)

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [signup, setSignup] = useState(false)

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
        <View style={styles.mainContainer}>
            {
                signup ? <Signup setSignup={setSignup}/> : <View style={[styles.card, styles.formContainer]}>
                    <Text style={styles.heading}>Login</Text>
                    <TextInput 
                        style={styles.inputContainer}
                        placeholder="Enter your username"
                        onChangeText={text => setUser({...user, username: text})}
                    />
                    <TextInput 
                        style={styles.inputContainer}
                        placeholder="Enter your password"
                        onChangeText={text => setUser({...user, password: text})}
                    />
                    <View style={styles.buttonContainer}>
                    <Button 
                        title="Login"
                        onPress={loginHandler}
                    />
                    </View>
                    <Text style={styles.loginToRegister}>Still not registered? <Pressable onPress={() => {setSignup(!signup)}} ><Text style={styles.regInLogin}>Register now</Text></Pressable></Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        top: 300
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 35,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 10,
    },
    formContainer: {
        width: 300,
        height: 300,
        marginLeft: 70,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#52006A',
        borderWidth: 1,
        borderRadius: 10,
    },
    inputContainer: {
        borderColor: '#aaa',
        borderWidth: 1,
        height: 40,
        width: 250,
        paddingLeft: 10,
        borderRadius: 7,
        marginBottom: 10
    },
    buttonContainer: {
        width: 150,
        borderRadius: 7,
        borderWidth: 1
    },
    loginToRegister: {
        width: 400,
        marginTop: 10,
        textAlign: 'center'
    },
    regInLogin: {
        color: 'blue',
        fontSize: 17,
        textDecorationLine: 'underline'
    }
})

export default Login