import Navigator from "./components/utils/navigater"
import Login from "./components/authentication/login"
import { StyleSheet, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useContext } from "react"
import { LOGGEDINUSER } from "./components/apis/taskApis"
import { OK } from "./components/utils/constants"
import { LoginContext, LoginStateProvider } from "./components/utils/contextStore"

const Index = () => {

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

export default Index