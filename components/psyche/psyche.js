import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Modal, Pressable, Image } from "react-native"
import { PSYCHE_GET } from "../apis/taskApis"

const Psyche = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={() => setModelVisibility(!modelVisibility)}
                >
                    <Image 
                    style={styles.addNewButton}
                    source={require('../../assets/addNew.png')}
                    />
                </Pressable>
            )
        })
    }, [])

    const [user, setUser] = useState({
        username: '',
        password: '',
        website: ''
    })
    const [newCred, setNewCred] = useState({
        username:"",
        password:"",
        url:"",
        website:""
    })
    const [credentials, setCredentials] = useState([])
    const [modelVisibility, setModelVisibility] = useState(false)



    const getCredentials = async () => {
        const response = await fetch(`${PSYCHE_GET}?username=${user.username}&password=${user.password}&website=${user.website}`)
        const data = await response.json()
        setCredentials(data.data)
    }

    const handleCreate = async () => {
        const response = await fetch(PSYCHE_GET, {
            method: 'POST',
            headers: {
                'Content-Type':'text/csv'
            },
            body: JSON.stringify(newCred)
        })
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
                                <Text selectable={true} style={styles.websiteContainer}>{each.website}</Text>
                                <Text selectable={true}>{each.username}</Text>
                                <Text selectable={true}>{each.password}</Text>
                            </View>) : <Text style={styles.emptyCredentials}>No credentials found</Text>
                        }
                    </ScrollView>
                </View>
            </View>
            {
              modelVisibility && <Modal
              animationType="fade"
              transparent={true}
              visible={modelVisibility}
              onRequestClose={() => {
                setModelVisibility(!modelVisibility)
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TextInput 
                    style={styles.inputBox}
                    placeholder="Enter the website"
                    onChangeText={(text) => setNewCred({...newCred, website: text})}
                  />
                  <TextInput 
                    style={styles.inputBox}
                    placeholder="Enter the url"
                    onChangeText={(text) => setNewCred({...newCred, url: text})}
                  />
                  <TextInput 
                    style={styles.inputBox}
                    placeholder="Enter the website"
                    onChangeText={(text) => setNewCred({...newCred, username: text})}
                  />
                  <TextInput 
                    style={styles.inputBox}
                    placeholder="Enter the website"
                    onChangeText={(text) => setNewCred({...newCred, password: text})}
                  />
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModelVisibility(!modelVisibility)}>
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => handleCreate()}>
                    <Text style={styles.textStyle}>Create</Text>
                  </Pressable>
                  </View>
              </View>
            </Modal>
            }
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
    },
    addNewButton : {
        width: 30,
        height: 30,
        marginRight: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      }
})

export default Psyche;