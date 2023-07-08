import { View, Text } from "react-native"
import { styles } from "../styles/authentication"
import Signup from "./signup"
import { useState } from "react"
import DownloadLatest from "../utils/downloadLatest"
import Login from "./login"

const Authenticate = () => {

    const [signup, setSignup] = useState(false)

    return (
        <View style={styles.mainContainer}>
            {
                signup ? <Signup setSignup={setSignup} /> : <Login setSignup={setSignup}/>
            }
            <DownloadLatest />
        </View>
    )
}

export default Authenticate