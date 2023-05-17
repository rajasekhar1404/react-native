import { useState } from "react"
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from "react-native"
import { PSYCHE_GET } from "./apis/taskApis"

const Psyche = () => {

    const [user, setUser] = useState({
        username: '',
        password: '',
        website: ''
    })
    const [credentials, setCredentials] = useState([])

    const getCredentials = async () => {
        const response = await fetch(`${PSYCHE_GET}?username=${user.username}&password=${user.password}&website=${user.website}`)
        const data = await response.json()
        setCredentials(data.data)
        console.log(data)
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelContainer}>Username</Text>
                    <TextInput 
                    placeholder="Enter your username"
                    placeholderTextColor={'#aaa'}
                    secureTextEntry={true}
                    onChangeText={text => setUser({...user, username: text})}
                    style={styles.inputBox}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelContainer}>Password</Text>
                    <TextInput 
                    placeholder="Enter your password"
                    placeholderTextColor={'#aaa'}
                    secureTextEntry={true}
                    onChangeText={text => setUser({...user, password: text})}
                    style={styles.inputBox}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelContainer}>Website</Text>
                    <TextInput 
                    placeholder="Enter the website name"
                    placeholderTextColor={'#aaa'}
                    secureTextEntry={true}
                    onChangeText={text => setUser({...user, website: text})}
                    style={styles.inputBox}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button onPress={getCredentials} title="Search"/>
                </View>
                <View style={styles.contentWrapper}>
                    <ScrollView>
                        {
                            credentials.length > 0 ? credentials.map(each => <View style={styles.credBlock}>
                                <Text style={styles.websiteContainer}>{each.website}</Text>
                                <Text>{each.username}</Text>
                                <Text>{each.password}</Text>
                            </View>) : <Text style={styles.emptyCredentials}>No credentials found</Text>
                        }
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        backgroundColor : '#282c34',
        height: 2000,
        padding: 10
    },
    inputBox : {
        width: 270,
        color: '#282c34',
        borderColor: "#eee",
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 5
    },
    labelContainer : {
        color: 'white',
        margin: 10,
        fontSize: 20,
        width: 100
    },
    inputContainer : {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    buttonContainer : {
        width: 300,
        marginLeft: 60,
        marginTop: 20
    },
    contentWrapper: {
        borderColor: "#eee",
        borderWidth: 1,
        height: 500,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 2
    },
    emptyCredentials : {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 200
    },
    credBlock : {
        borderColor: '#aaa',
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        height: 100
    },
    websiteContainer : {
        color: '#eee',
        fontSize: 20,
        borderBottomColor: '#aaa',
        borderBottomWidth: 1,
        padding: 5,
        marginBottom: 5
    }
})

export default Psyche;