import { useEffect, useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import Task from "./taskHolder"
import { GET_ALL_TASKS, UPDATE_TASK } from "./apis/taskApis"

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
        const response = await fetch(GET_ALL_TASKS)
        const data = await response.json()
        setTasks(data)
    }

    const handleUpdate = async () => {
        const response = await fetch(UPDATE_TASK, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
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
                tasks.length !== 0 ? tasks.map(eachTask => <Task key={eachTask._id}
                    _id={eachTask._id}
                    title={eachTask.title} 
                    description={eachTask.description}
                    startDate={eachTask.startDate}
                    dueDate={eachTask.dueDate}
                    status={eachTask.status}
                    task={task}
                    setTask={setTask}
                    handleUpdate={handleUpdate}
                />) : <Text style={styles.noTasksContainer}>No tasks created.</Text>
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