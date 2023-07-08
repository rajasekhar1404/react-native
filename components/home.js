import Navigator from "./utils/navigater"
import Login from "./authentication/login"
import { StyleSheet, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useContext, useState } from "react"
import { LOGGEDINUSER } from "./apis/taskApis"
import { OK } from "./utils/constants"
import { LoginContext } from "./utils/contextStore"
import * as LocalAuthentication from 'expo-local-authentication'
import Authenticate from "./authentication/authenticate"

const Home = () => {

  const {key, setKey} = useContext(LoginContext)
  const [localAuth, setLocalAuth] = useState(false)

  useEffect(() => {
    validateLocalAuthentication()
    validateToken()
  }, [])

  const validateLocalAuthentication = async () => {
    const response = await LocalAuthentication.authenticateAsync()
    setLocalAuth(response.success)
  }

  const validateToken = async () => {
    const token = await AsyncStorage.getItem('key')
    const response = await fetch(LOGGEDINUSER, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    if (response.status !== OK) {
      setKey(null)
    } else {
      setKey(token)
    }
  }

  return (
      <View style={styles.container}>
        {
          key && localAuth ? <Navigator /> : <Authenticate />  // <Login />
        }
      </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1
  }
})

export default Home