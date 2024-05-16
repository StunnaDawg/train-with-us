import { Text, SafeAreaView, Pressable } from "react-native"
import supabase from "../lib/supabase"
import { FontAwesome6 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../app/@types/navigation"
const NavBar = () => {
  const navigation = useNavigation<TabNavigationType>()
  const handleSignOut = () => {
    try {
      supabase.auth.signOut()
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <>
      <SafeAreaView className="flex flex-row justify-between items-center m-5">
        <Text
          className="text-2xl font-bold"
          onPress={() => navigation.navigate("Events")}
        >
          Train With Us
        </Text>
        <Pressable onPress={() => handleSignOut()}>
          <Text>Log out</Text>
        </Pressable>
      </SafeAreaView>
    </>
  )
}

export default NavBar
