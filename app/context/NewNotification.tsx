import React, { createContext, useState, useContext, ReactNode } from "react"

// Define the shape of the context data
interface NewNotificationContextType {
  isNewNotification: boolean
  setNewNotification: (state: boolean) => void
}

// Create the context with default values
const NewNotificationContext = createContext<
  NewNotificationContextType | undefined
>(undefined)

// Create a provider component
export const NewNotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isNewNotification, setIsNewNotification] = useState<boolean>(false)

  const setNewNotification = (state: boolean) => {
    setIsNewNotification(state)
  }

  return (
    <NewNotificationContext.Provider
      value={{ isNewNotification, setNewNotification }}
    >
      {children}
    </NewNotificationContext.Provider>
  )
}

// Create a custom hook to use the NewNotification context
export const useNewNotification = (): NewNotificationContextType => {
  const context = useContext(NewNotificationContext)
  if (!context) {
    throw new Error(
      "useNewNotification must be used within a NewNotificationProvider"
    )
  }
  return context
}
