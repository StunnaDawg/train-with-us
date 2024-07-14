import React, { createContext, useState, useContext, ReactNode } from "react"

// Define the shape of the context data
interface LoadingContextType {
  isLoading: boolean
  setLoading: (state: boolean) => void
}

// Create the context with default values
const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

// Create a provider component
export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const setLoading = (state: boolean) => {
    setIsLoading(state)
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

// Create a custom hook to use the loading context
export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}
