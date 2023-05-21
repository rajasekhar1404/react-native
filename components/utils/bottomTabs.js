import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Tasks from '../tasks/Tasks';
import TaskPad from '../taskPad/taskPad';
import Psyche from '../psyche/psyche';
import Scheduler from '../tasks/scheduler';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOGGEDINUSER } from '../apis/taskApis';
import { useEffect, useState } from 'react'
import { OK } from './constants';

const Tabs = createBottomTabNavigator()

function BottomTabs() {

  const [username, setUsername] = useState('Home')

  useEffect(() => {
    getLoggedInUser()
  }, [])

  const getLoggedInUser = async () => {
    const token = await AsyncStorage.getItem('key')
    const response = await fetch(LOGGEDINUSER, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    if (response.status === OK) {
      const data = await response.json()
      setUsername(data.fullname)
    }
  }

    return (
      <Tabs.Navigator>
        <Tabs.Screen 
         name={username}
         component={Scheduler}
         options={{
          tabBarIcon : () => (
            <Icon name="home" size={30} color="black" />
          )
         }}
        />
        <Tabs.Screen
         name="Tasks"
         component={Tasks}
         options={{
          tabBarIcon : () => (
            <Icon name="bars" size={30} color="black" />
          )
         }} 
        />
        <Tabs.Screen
         name="Task Pad"
         component={TaskPad}
         options={{
          tabBarIcon : () => (
            <Icon name="clipboard" size={30} color="black" />
          )
         }} 
        />
        <Tabs.Screen
         name="Psyche"
         component={Psyche}
         options={{
          tabBarIcon : () => (
            <Icon name="key" size={30} color="black" />
          )
         }} 
        />
      </Tabs.Navigator>
    )
  }

export default BottomTabs;