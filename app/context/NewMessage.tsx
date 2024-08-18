import React, { createContext, useState, useContext, ReactNode } from "react"

// Define the shape of the context data
interface NewMessageContextType {
  isNewMessage: boolean
  setNewMessage: (state: boolean) => void
}

// Create the context with default values
const NewMessageContext = createContext<NewMessageContextType | undefined>(
  undefined
)

// Create a provider component
export const NewMessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false)

  const setNewMessage = (state: boolean) => {
    setIsNewMessage(state)
  }

  return (
    <NewMessageContext.Provider value={{ isNewMessage, setNewMessage }}>
      {children}
    </NewMessageContext.Provider>
  )
}

// Create a custom hook to use the NewMessage context
export const useNewMessage = (): NewMessageContextType => {
  const context = useContext(NewMessageContext)
  if (!context) {
    throw new Error("useNewMessage must be used within a NewMessageProvider")
  }
  return context
}
