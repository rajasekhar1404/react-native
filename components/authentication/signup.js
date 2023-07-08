import { View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native"
import { useState } from "react"
import { REGISTER_USER } from "../apis/taskApis"
import { CREATED, OK } from "../utils/constants"
import { styles } from "../styles/authentication"

const Signup = ({setSignup}) => {

    const [user, setUser] = useState({
        fullname: '',
        email: '',
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
        if (response.status === CREATED) {
            setSignup(false)
        }
    }

    return (
            <View style={[styles.card, styles.formContainer]}>
                <Text style={styles.heading}>Register</Text>
                <TextInput 
                    style={styles.registerInputContainer}
                    placeholder="Enter your fullname"
                    onChangeText={text => setUser({...user, fullname: text})}
                />
                <TextInput 
                    style={styles.registerInputContainer}
                    placeholder="Enter your email"
                    onChangeText={text => setUser({...user, email: text})}
                />
                <TextInput 
                    style={styles.registerInputContainer}
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

export default Signup