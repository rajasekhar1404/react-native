import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Task from './taskHolder'

const TasksOfDay = ({ route, navigation}) => {

    const {date, yearAndMonth} = route.params
    const [tasksOfDay, setTasksOfDay] = useState([])

    const getTasksOfDay = async () => {
        const response = await fetch('http://localhost:8080/tasks/date', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ date : new Date(yearAndMonth.year, yearAndMonth.month, date).toISOString()})
        })

        const data = await response.json()
        setTasksOfDay(data)
        console.log(data)
    }

    useEffect(() => {
        getTasksOfDay()
    }, [])

    return (
        <View>
            <View>
                <Text>{new Date(yearAndMonth.year, yearAndMonth.month, date).toString()}</Text>
                {
                    tasksOfDay.length !== 0 ? tasksOfDay.map(eachTask => <Task key={eachTask._id}
                        title={eachTask.title} 
                        description={eachTask.description}
                        startDate={eachTask.startDate}
                        dueDate={eachTask.dueDate}
                        status={eachTask.status}
                    />) : <Text style={styles.noTasksContainer}>No tasks created.</Text>
                }
            </View>
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

export default TasksOfDay;