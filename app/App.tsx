import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { NavStack } from "./NavStack"
import { AuthProvider } from "./supabaseFunctions/authcontext"

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <NavStack />
      </NavigationContainer>
    </AuthProvider>
  )
}
