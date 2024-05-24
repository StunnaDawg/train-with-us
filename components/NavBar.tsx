import { Text, SafeAreaView, Pressable, View } from "react-native"
import supabase from "../lib/supabase"
import { FontAwesome6 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../app/@types/navigation"
import { Image } from "expo-image"
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
      <SafeAreaView className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center">
          <Pressable onPress={() => navigation.navigate("Events")}>
            <Image
              source={require("../assets/images/TWU-Logo.png")}
              style={{ width: 75, height: 75 }}
            />
          </Pressable>
          <Text className="font-bold text-2xl">Train With Us</Text>
        </View>
        <View className="mx-2">
          <Pressable onPress={() => handleSignOut()}>
            <Text className="text-lg font-bold">Log out</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  )
}

export default NavBar
