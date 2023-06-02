import { View, Image, StyleSheet, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext } from 'react';
import { LoginContext } from "../utils/contextStore";

const Logout = () => {

  const {setKey} = useContext(LoginContext)

    return (
      <View style={styles.buttonStyle}>
        <Pressable
          onPress={async () => {
            await AsyncStorage.clear(); 
              setKey(null)
          }}
        >
          <Image
          style={styles.logoutContainer}
          source={require('../../assets/logout.png')}
          title="Logout"
          />
        </Pressable>
      </View>
    )
  }

const styles = StyleSheet.create({
buttonStyle: {
    marginRight: 20,
},
logoutContainer: {
  width: 35,
  height: 25
}
})

export default Logout