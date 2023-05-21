import { StyleSheet, View } from "react-native"
import Navigator from "./components/utils/navigater"
import Login from "./components/authentication/login"
import Home from "./components/home"
import { LoginStateProvider } from "./components/utils/contextStore"

export default App = () => {

  return (
    <LoginStateProvider>
      <Home />
    </LoginStateProvider>
  )
}