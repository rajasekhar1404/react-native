import { StyleSheet, View } from "react-native"
import Scheduler from "./components/scheduler"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import tasksOfDay from "./components/tasksOfDay"
import Tasks from "./components/Tasks"

const Tabs = createBottomTabNavigator()

const Stack = createNativeStackNavigator()

function BottomTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={Scheduler}/>
      <Tabs.Screen name="Tasks" component={Tasks} />
    </Tabs.Navigator>
  )
}

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{
            headerShown : false
          }} name="bottomTabs" component={BottomTabs}/>
          <Stack.Screen name="taskDetails" options={{
            title : 'Task Details'
          }} component={Scheduler}/>
          <Stack.Screen name="tasksOfDay" options={{
            title : 'Tasks of day'
          }} component={tasksOfDay}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1
  }
})

export default App