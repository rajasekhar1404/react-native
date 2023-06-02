import { useEffect, useState } from "react"
import { Text, View, StyleSheet, FlatList } from "react-native"
import Task from "./taskHolder"
import { GET_ALL_TASKS, UPDATE_TASK } from "../apis/taskApis"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Tasks = () => {
    
    const [tasks, setTasks] = useState([])
    const [isUpdated, setUpdate] = useState(0)
    const [task, setTask] = useState({
        _id: '',
        title: '',
        description: '',
        startDate: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        status: ''
    })
    
    useEffect(() => {
        getAllTasks()
    }, [isUpdated])
    
    const getAllTasks = async () => {
        const response = await fetch(GET_ALL_TASKS, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${await AsyncStorage.getItem('key')}`
            }
        })
        const data = await response.json()
        setTasks(data)
    }

    const handleUpdate = async () => {
        const response = await fetch(UPDATE_TASK, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${await AsyncStorage.getItem('key')}`
            },
            body : JSON.stringify(task)
        })
        if (response.status === 200) {
            isUpdated === 0 ? setUpdate(1) : setUpdate(0)
        }
    }

    return (
        <View>
            {
               tasks.length !== 0 ? <FlatList 
                    data={tasks}
                    renderItem={eachTask => <Task 
                        _id={eachTask.item._id}
                        title={eachTask.item.title} 
                        description={eachTask.item.description}
                        startDate={eachTask.item.startDate}
                        dueDate={eachTask.item.dueDate}
                        status={eachTask.item.status}
                        task={task}
                        setTask={setTask}
                        handleUpdate={handleUpdate}
                    />}
                /> : <Text style={styles.noTasksContainer}>No tasks created.</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    noTasksContainer : {
        fontSize : 20,
        textAlign : 'center',
        margin : 20
    }
})

export default Tasks