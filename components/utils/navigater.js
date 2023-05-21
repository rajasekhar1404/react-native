import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabs from './bottomTabs'
import Scheduler from '../tasks/scheduler'
import TasksOfDay from '../tasks/tasksOfDay'

const Stack = createNativeStackNavigator()

const Navigator = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
           options={{
             headerShown : false,
            }}
            name="bottomTabs"
            component={BottomTabs}
            />
          <Stack.Screen name="taskDetails" options={{
            title : 'Task Details'
          }} component={Scheduler}/>
          <Stack.Screen 
            name="tasksOfDay"
            options={{
              title : 'Tasks of day',
            }}
            component={TasksOfDay}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default Navigator;