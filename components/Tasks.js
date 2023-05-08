import { useEffect, useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import Task from "./taskHolder"
import { GET_ALL_TASKS, UPDATE_TASK } from "./apis/taskApis"

const Tasks = () => {
    
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState({
        title: '',
        description: '',
        startDate: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        status: ''
    })
    
    useEffect(() => {
        getAllTasks()
    }, [])
    
    const getAllTasks = async () => {
        const response = await fetch(GET_ALL_TASKS)
        const data = await response.json()
        setTasks(data)
    }

    const handleUpdate = async () => {
        // const response = await fetch(UPDATE_TASK, {
        //     method : 'PUT',
        //     headers : {
        //         'Content-Type' : 'application/json'
        //     },
        //     body : JSON.stringify()
        // })
        // console.log(response)
        console.log(task)
    }

    return (
        <View>
            {
                tasks.length !== 0 ? tasks.map(eachTask => <Task key={eachTask._id}
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