import { useEffect, useState } from "react"
import { View, StyleSheet, TextInput, Text, Button, Image, Pressable, ScrollView } from "react-native"
import Markdown from "react-native-markdown-display"
import { GET_TASKPAD_CONTENT, UPDATE_TASKPAD_CONTENT } from "../apis/taskApis"
import AsyncStorage from '@react-native-async-storage/async-storage'

const TaskPad = ({ navigation }) => {

    const [isEditing, setEditing] = useState(false)
    const [text, setText] = useState({
        content : ''
    })

    useEffect(() => {
        getTaskPadContent()
    }, [isEditing])

    navigation.setOptions({
        headerRight: () => (
            <View>
                
                {
                    isEditing ? <View style={styles.saveButtonContainer}>
                    <Pressable onPress={handleAddTimeStamp}><Image style={styles.imageStyles} source={require('../../assets/calendar-plus.png')} alt="Add timestamp"/></Pressable>
                    <Pressable onPress={handleSave}><Image style={styles.imageStyles} source={require('../../assets/journal-check.png')} alt="Save"/></Pressable>
                </View> : <Pressable onPress={handleEditing}>
                    <Image 
                    style={styles.imageContainer}
                    source={require('../../assets/pencil-square.png')}
                    alt="Edit"
                    />
                </Pressable>
                }
            </View>
            )
        })


    const getTaskPadContent = async () => {
            const response = await fetch(GET_TASKPAD_CONTENT, {
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${await AsyncStorage.getItem('key')}`
                }
            })
            const data = await response.json()
            if (data) {
                setText(data)
            }
        }
        
        const handleSave = async () => {
            fetch(UPDATE_TASKPAD_CONTENT, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(text)
            }).then(res => res.json()).then(json => setText(json))
            setEditing(prev => !prev)
        }

        const handleEditing = () => {
        setEditing(prev => !prev)
    }


    const handleAddTimeStamp = () => {
        setText({content : text.content + ` \n---\n###### _${new Date().toLocaleString()}_\n---\n`})
    }

    return (
        <View style={styles.mainContainer}>
            {
                isEditing ? <TextInput
                multiline={true}
                numberOfLines={1000}
                value={text.content}
                style={styles.textArea}
                onChangeText={(t) => setText({content : t})}
                /> : <ScrollView><Markdown style={styles.markdownText}>{text.content}</Markdown></ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        backgroundColor : '#282c34',
        padding: 5
    },
    textArea : {
        textAlignVertical : 'top',
        color: 'white',
        fontSize: 20
    },
    markdownText : {
        body : {
            color : 'white',
            padding : 10,
            height: 2000
        },
        em : {
            color : '#eee'
        },
        hr : {
            backgroundColor: '#eee'
        },
        fence : {
            backgroundColor : 'black'
        }
    },
    imageContainer : {
        width : 40,
        height : 40,
        marginLeft : 5,
        marginRight : 10
    },
    saveButtonContainer : {
        flexDirection : 'row'
    },
    imageStyles : {
        width : 40,
        marginLeft : 5,
        marginRight : 10,
        height : 40
    }
})

export default TaskPad