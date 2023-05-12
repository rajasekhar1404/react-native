import { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Modal, TextInput } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown';
import { generateYears, months, getDates } from './utils/setUpDates';

const Task = ({_id, title, description, startDate, dueDate, status, task, setTask, handleUpdate }) => {

    const [modalVisible, setModalVisible] = useState(false);
  
    const handleUpdateModelVisiblity = () => {
        setTask({...task, _id, title, description, startDate, dueDate, status})
        setModalVisible(!modalVisible)
    }

    return (
        <View>
            <Pressable onPress={() => handleUpdateModelVisiblity()}>
                <View style={styles.taskContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.titleContainer}>{title}</Text>
                        <View style={styles.statusContainer}>
                            <Text style={styles.statusText}>{status}</Text>
                        </View>
                    </View>
                    <Text style={styles.textContainer}>{description.substring(0, 50)}...</Text>
                    <Text style={styles.textContainer}>{startDate.substring(0, 10)} &rarr; {dueDate.substring(0, 10)}</Text>
                </View>
            </Pressable>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Update Form</Text>
                  <TextInput
                   value={task.title}
                   onChangeText={text => setTask({...task, title: text})}
                  />
                  <TextInput
                   value={task.description}
                   onChangeText={(text) => setTask({...task, description : text})}
                  />
                  <View style={styles.startDateContainer}>
                    <SelectDropdown 
                        defaultValue={new Date(startDate).getFullYear()}
                        data={generateYears()}
                        buttonStyle={styles.selectYearContainer}
                    />
                    <SelectDropdown 
                        defaultValue={new Date(startDate).getMonth()}
                        data={months}
                        buttonStyle={styles.selectContainer}
                    />
                    <SelectDropdown 
                        defaultValue={new Date(startDate).getDate()}
                        data={getDates(5)}
                        buttonStyle={styles.selectContainer}
                    />
                  </View>
                  <SelectDropdown 
                    defaultValue={task.status}
                    data={['TO-DO', 'IN-PROGRESS', 'COMPLETED', 'CANCELLED']}
                  />
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => handleUpdate()}>
                    <Text style={styles.textStyle}>Update</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer : {
        fontSize : 20,
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor : 'white',
        borderBottomWidth : 1,
        paddingBottom : 5,
        marginBottom : 5
      },
    taskContainer : {
        borderColor : 'black',
        borderWidth : 1,
        padding : 10,
        marginHorizontal : 10,
        marginVertical : 5,
        backgroundColor : '#2596be',
        borderRadius : 5
    },
    textContainer : {
        color : 'white'
    },
    statusContainer: {
        backgroundColor: '#ccc',
        borderRadius: 5,
        padding: 5,
    },
    statusText: {
        textAlign: 'right',
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
      },
      startDateContainer : {
        flexDirection : 'row',
        backgroundColor : 'blue',
      },
      selectContainer : {
        width : 50,
      },
      selectYearContainer : {
        width : 75
      }
})

export default Task