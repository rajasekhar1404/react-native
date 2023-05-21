// import { useState } from 'react'
import React, { useState } from 'react'

// Step 1: Create a context
export const LoginContext = React.createContext()

// Step 2: Create a provider component
export const LoginStateProvider = ({children}) => {
    const [key, setKey] = useState(null)
    return (
        <LoginContext.Provider value={{key, setKey}}>
            {children}
        </LoginContext.Provider>
    )
}