import { Text, View, StyleSheet } from 'react-native'

const Task = ({title, description, startDate, dueDate, status }) => {
    return (
        <View style={styles.taskContainer}>
            <Text style={styles.textContainer}>{title}</Text>
            <Text style={styles.textContainer}>{description.substring(0, 30)}</Text>
            <Text style={styles.textContainer}>{startDate}</Text>
            <Text style={styles.textContainer}>{dueDate}</Text>
            <Text style={styles.textContainer}>{status}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    taskContainer : {
        borderColor : 'black',
        borderWidth : 1,
        padding : 10,
        margin : 10,
        backgroundColor : '#2596be'
    },
    textContainer : {
        color : 'white'
    }
})

export default Task