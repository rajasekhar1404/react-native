import Navigator from "./utils/navigater"
import Login from "./authentication/login"
import { StyleSheet, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useContext } from "react"
import { LOGGEDINUSER } from "./apis/taskApis"
import { OK } from "./utils/constants"
import { LoginContext } from "./utils/contextStore"

const Home = () => {

  const {key, setKey} = useContext(LoginContext)

  useEffect(() => {
    validateToken()
  }, [key])

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
          key ? <Navigator /> : <Login />
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