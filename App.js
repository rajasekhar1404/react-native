import { StyleSheet, View } from "react-native"
import Navigator from "./components/utils/navigater"
import Login from "./components/authentication/login"
import Index from "./index"
import { LoginStateProvider } from "./components/utils/contextStore"

const App = () => {

  return (
    <LoginStateProvider>
      <Index />
    </LoginStateProvider>
  )
}

export default App