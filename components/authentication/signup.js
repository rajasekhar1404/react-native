import { View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native"
import { useState } from "react"
import { REGISTER_USER } from "../apis/taskApis"
import { OK } from "../utils/constants"

const Signup = ({setSignup}) => {

    const [user, setUser] = useState({
        fullname: '',
        username: '',
        password: ''
    })

    const registerHandler = async () => {
        const response = await fetch(REGISTER_USER, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
        })
        if (response.status === OK) {
            setSignup(false)
        }
    }

    return (
            <View style={[styles.card, styles.formContainer]}>
                <Text style={styles.heading}>Register</Text>
                <TextInput 
                    style={styles.inputContainer}
                    placeholder="Enter your fullname"
                    onChangeText={text => setUser({...user, fullname: text})}
                />
                <TextInput 
                    style={styles.inputContainer}
                    placeholder="Enter your username"
                    onChangeText={text => setUser({...user, username: text})}
                />
                <TextInput 
                    style={styles.inputContainer}
                    secureTextEntry={true}
                    placeholder="Enter your password"
                    onChangeText={text => setUser({...user, password: text})}
                />
                <View style={styles.buttonContainer}>
                <Button 
                    title="Register"
                    onPress={registerHandler}
                />
                </View>
                <Text style={styles.loginToRegister}>Already registered? <Pressable onPress={() => {setSignup(false)}} ><Text style={styles.regInLogin}>Login here</Text></Pressable></Text>
            </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 10,
    },
    formContainer: {
        width: "75%",
        marginHorizontal: "13%",
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#52006A',
        borderWidth: 1,
        borderRadius: 10,
    },
    inputContainer: {
        borderColor: '#aaa',
        borderWidth: 1,
        height: "12%",
        width: "100%",
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
        textAlign: 'center',
    },
    regInLogin: {
        color: 'blue',
        fontSize: 17,
        textDecorationLine: 'underline'
    }
})

export default Signup