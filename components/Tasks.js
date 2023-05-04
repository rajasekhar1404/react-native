import { useEffect, useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import Task from "./taskHolder"

const Tasks = () => {
    
    const [tasks, setTasks] = useState([])

    const getAllTasks = async () => {
        const response = await fetch('http://localhost:8080/tasks/')
        const data = await response.json()
        setTasks(data)
    }

    useEffect(() => {
        console.log("something")
        getAllTasks()
    }, [])

    return (
        <View>
            {
                tasks.length !== 0 ? tasks.map(eachTask => <Task key={eachTask._id}
                    title={eachTask.title} 
                    description={eachTask.description}
                    startDate={eachTask.startDate}
                    dueDate={eachTask.dueDate}
                    status={eachTask.status}
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