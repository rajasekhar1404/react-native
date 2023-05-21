import { View, Button, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext } from 'react';
import { LoginContext } from "../utils/contextStore";

const Logout = () => {

  const {setKey} = useContext(LoginContext)

    return (
      <View style={styles.buttonStyle}>
        <Button
        onPress={async () => {
           await AsyncStorage.clear(); 
            setKey(null)
        }}
        title="Logout"
        />
      </View>
    )
  }

const styles = StyleSheet.create({
buttonStyle: {
    marginRight: 20
}
})

export default Logout