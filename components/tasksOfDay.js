import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import Task from './taskHolder'
import { CREATE_TASK, TASKS_BY_DATE } from './apis/taskApis'
import TaskForm from './utils/formModel'

const TasksOfDay = ({ route, navigation}) => {

    const {date, yearAndMonth} = route.params
    const [tasksOfDay, setTasksOfDay] = useState([])
    const [create, setCreate] = useState(false)
    const [task, setTask] = useState({
        title: '',
        description: '',
        startDate: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        status: ''
    })
    
    
    const handleCreate = async () => {
        const response = await fetch(CREATE_TASK, {
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(task)
        })
    }
    
    const getTasksOfDay = async () => {
        
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => setCreate(true)} title="Create Task" />
              )
        })
        const response = await fetch(`${TASKS_BY_DATE}`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
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
                        title={eachTask.item.title} 
                        description={eachTask.item.description}
                        startDate={eachTask.item.startDate}
                        dueDate={eachTask.item.dueDate}
                        status={eachTask.item.status}
                        setTask={setTask}
                        task={task}
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