import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, Pressable, Image } from 'react-native'
import Task from './taskHolder'
import { CREATE_TASK, TASKS_BY_DATE, UPDATE_TASK } from '../apis/taskApis'
import TaskForm from '../utils/formModel'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TasksOfDay = ({ route, navigation}) => {

    const {date, yearAndMonth} = route.params
    const [tasksOfDay, setTasksOfDay] = useState([])
    const [create, setCreate] = useState(false)
    const initalTask = {
        _id: '',
        title: '',
        description: '',
        startDate: new Date(yearAndMonth.year, yearAndMonth.month, date).toISOString(),
        dueDate: new Date(yearAndMonth.year, yearAndMonth.month, date).toISOString(),
        status: ''
    }
    const [task, setTask] = useState(initalTask)
    
    
    const handleCreate = async () => {
        const response = await fetch(CREATE_TASK, {
            method : 'POST',
            headers : {
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${await AsyncStorage.getItem('key')}`
            },
            body : JSON.stringify(task)
        })
    }

    const handleUpdate = async () => {
        const response = await fetch(UPDATE_TASK, {
            method: 'PUT',
            headers : {
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${await AsyncStorage.getItem('key')}`
            },
            body: JSON.stringify(task)
        })
        if (response.status === 200) {
            setCreate(false)
        }
    }

    const getTasksOfDay = async () => {
        
        navigation.setOptions({
            headerRight: () => (
               <Pressable
                onPress={() => {
                    setTask(initalTask);
                    setCreate(true)
                }}
               >
                    <Image 
                        style={styles.addNewButton}
                        source={require('../../assets/addNew.png')}
                    />
               </Pressable>
              )
        })
        const response = await fetch(`${TASKS_BY_DATE}`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${await AsyncStorage.getItem('key')}`
            },
            body : JSON.stringify({ date : new Date(yearAndMonth.year, yearAndMonth.month, date).toISOString()})
        })
        
        const data = await response.json()
        setTasksOfDay(data)
    }

    useEffect(() => {
        getTasksOfDay()
    }, [])

    return (
        <View>
            <View>
                <Text style={styles.dateContainer}>{`${yearAndMonth.year}-${yearAndMonth.month + 1}-${date}`}</Text>
            </View>
            <View>
                {                
                tasksOfDay.length !== 0 ? <FlatList 
                    data={tasksOfDay}
                    renderItem={eachTask => <Task 
                        key={eachTask.item._id}
                        _id={eachTask.item._id}
                        title={eachTask.item.title} 
                        description={eachTask.item.description}
                        startDate={eachTask.item.startDate}
                        dueDate={eachTask.item.dueDate}
                        status={eachTask.item.status}
                        setTask={setTask}
                        task={task}
                        handleUpdate={handleUpdate}
                    />}
                /> : <Text style={styles.noTasksContainer}>No tasks created.</Text>
                }
            </View>
            {
                create && <TaskForm create={create} setCreate={setCreate} task={task} setTask={setTask} handleCreate={handleCreate}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    noTasksContainer : {
        fontSize : 20,
        textAlign : 'center',
        margin : 20
    },
    addNewButton : {
        width: 30,
        height: 30,
        marginRight: 10
    },
    dateContainer : {
        textAlign : 'center',
        fontSize : 25,
        backgroundColor : '#2f4f4f',
        color : 'white',
        fontWeight : 'bold',
        margin : 5,
        padding : 5
    }
})

export default TasksOfDay;