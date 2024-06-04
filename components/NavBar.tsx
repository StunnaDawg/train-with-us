import { Text, SafeAreaView, Pressable, View } from "react-native"
import supabase from "../lib/supabase"
import { FontAwesome6 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NavigationType, TabNavigationType } from "../app/@types/navigation"
import { Image } from "expo-image"
const NavBar = () => {
  const navigationTab = useNavigation<TabNavigationType>()
  const navigation = useNavigation<NavigationType>()

  return (
    <>
      <SafeAreaView className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center">
          <Pressable onPress={() => navigationTab.navigate("Events")}>
            <Image
              source={require("../assets/images/TWU-Logo.png")}
              style={{ width: 75, height: 75 }}
            />
          </Pressable>
          <Text className="font-bold text-2xl">Train With Us</Text>
        </View>
        <View className="mx-2">
          <Pressable onPress={() => navigation.navigate("UserSettings")}>
            <FontAwesome6 name="gear" size={24} color="black" />
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  )
}

export default NavBar
