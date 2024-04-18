import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { NavStack } from "./NavStack"
import { AuthProvider } from "./hooks/authcontext"

export default function App() {
  return (
    <AuthProvider>
      <NavStack />
    </AuthProvider>
  )
}
