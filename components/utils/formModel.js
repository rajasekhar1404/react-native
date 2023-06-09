import { Modal, View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown';
import { generateYears, months, getDates } from '../utils/setUpDates';

const TaskForm = ({ create, setCreate, task, setTask, handleCreate }) => {

    return (
        <Modal
              animationType="fade"
              transparent={true}
              visible={create}
              onRequestClose={() => {
                setCreate(!create)
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Create Form</Text>
                  <TextInput 
                    style={styles.descriptionContainer}
                    placeholder='Enter task title'
                    value={task.title}
                    onChangeText={(text) => setTask({...task, title : text})}
                   />
                  <TextInput
                   style={styles.descriptionContainer}
                   multiline={true}
                   numberOfLines={7}
                   placeholder='Enter task description'
                   value={task.description}
                   onChangeText={(text) => setTask({...task, description : text})}
                  />
                  <View style={styles.startDateContainer}>
                    <SelectDropdown 
                        defaultValue={new Date(task.startDate).getFullYear()}
                        data={generateYears()}
                        buttonStyle={styles.selectYearContainer}
                        onSelect={(text) => setTask({...task, startDate: new Date(text, new Date(task.startDate).getMonth(), new Date(task.startDate).getDate())})}
                    />
                    <SelectDropdown 
                        defaultValue={new Date(task.startDate).getMonth() + 1}
                        data={months}
                        buttonStyle={styles.selectYearContainer}
                        onSelect={(text) => setTask({...task, startDate: new Date(new Date(task.startDate).getFullYear(), text - 1, new Date(task.startDate).getDate())})}
                    />
                    <SelectDropdown 
                        defaultValue={new Date(task.startDate).getDate()}
                        data={getDates(5)}
                        buttonStyle={styles.selectYearContainer}
                        onSelect={(text) => setTask({...task, startDate: new Date(new Date(task.startDate).getFullYear(), new Date(task.startDate).getMonth(), text)})}
                    />
                  </View>
                  <View style={styles.startDateContainer}>
                    <SelectDropdown 
                        defaultValue={new Date(task.dueDate).getFullYear()}
                        data={generateYears()}
                        buttonStyle={styles.selectYearContainer}
                        onSelect={(text) => setTask({...task, dueDate: new Date(text, new Date(task.dueDate).getMonth(), new Date(task.dueDate).getDate())})}
                    />
                    <SelectDropdown 
                        defaultValue={new Date(task.dueDate).getMonth() + 1}
                        data={months}
                        buttonStyle={styles.selectYearContainer}
                        onSelect={(text) => setTask({...task, dueDate: new Date(new Date(task.dueDate).getFullYear(), text - 1, new Date(task.dueDate).getDate())})}
                    />
                    <View>
                      <SelectDropdown
                          defaultValue={new Date(task.dueDate).getDate()}
                          data={getDates(5)}
                          buttonStyle={styles.selectYearContainer}
                          onSelect={(text) => setTask({...task, dueDate: new Date(new Date(task.dueDate).getFullYear(), new Date(task.dueDate).getMonth(), text)})}
                      />
                    </View>
                  </View>
                    <SelectDropdown 
                      defaultValue={task.status}
                      data={['TO-DO', 'IN-PROGRESS', 'COMPLETED', 'CANCELLED']}
                      onSelect={(text) => setTask({...task, status: text})}
                      buttonStyle={styles.seletStatusContainer}
                    />
                  <View style={styles.bottonContainer}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setCreate(!create)}>
                      <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {handleCreate();setCreate(!create)}}>
                      <Text style={styles.textStyle}>{task._id ? 'Update' : 'Create' }</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
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
      bottonContainer : {
        flexDirection: 'row'
      },
      modalText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      button: {
        borderRadius: 7,
        width: 80,
        padding: 10,
        elevation: 2,
        margin: 10
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      startDateContainer : {
        flexDirection : 'row',
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 7,
        marginBottom: 7
      },
      dueDateContainer : {
        flexDirection : 'row',
      },
      selectYearContainer : {
        width : 80,
        backgroundColor: '#fff',
      },
      seletStatusContainer : {
        width : 200,
        backgroundColor: '#fff',
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 7
      },
      descriptionContainer: {
        width: 300,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 7,
        marginTop: 7,
        marginBottom: 7,
        borderRadius: 7
      }
})

export default TaskForm