import { Text, SafeAreaView, Pressable, View, Platform } from "react-native"
import { FontAwesome6, FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NavigationType, TabNavigationType } from "../app/@types/navigation"
import { Image } from "expo-image"
import { Profile } from "../app/@types/supabaseTypes"

type NavBarProps = {
  title: string
  userProp?: Profile
  bgColour?: string
  textColour?: string
  iconColour?: string
  showFriends: boolean
  showSettings: boolean
  showSearchCommunities: boolean
}

const NavBar = ({
  title,
  userProp,
  bgColour,
  textColour,
  iconColour,
  showFriends,
  showSettings,
  showSearchCommunities,
}: NavBarProps) => {
  // const [show, setShow] = useState<boolean>(false)
  // const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const navigationTab = useNavigation<TabNavigationType>()
  const navigation = useNavigation<NavigationType>()
  // const { user } = useAuth()

  // useEffect(() => {
  //   if (!userProp || !user) return
  //   useCurrentUser(user?.id, setCurrentUser)
  // }, [user])

  // useEffect(() => {
  //   if (currentUser?.new_update_modal === false) {
  //     setShow(true)
  //   }
  // }, [currentUser])

  return (
    <>
      <SafeAreaView
        style={{ paddingTop: Platform.OS == "android" ? 20 : 0 }}
        className={`flex flex-row justify-between items-center ${bgColour}`}
      >
        <View className="flex flex-row items-center">
          <Pressable onPress={() => navigationTab.navigate("Events")}>
            <Image
              source={require("../assets/images/TWU-Logo.png")}
              style={{ width: 50, height: 50 }}
            />
          </Pressable>
          <Text className={`font-bold text-lg ${textColour}`}>{title}</Text>
        </View>
        <View className="flex flex-row justify-center mx-2 items-center">
          {showSearchCommunities ? (
            <Pressable
              className="mx-2 mt-1"
              onPress={() => {
                navigation.navigate("SearchCommunities")
              }}
            >
              <FontAwesome6 name="magnifying-glass" size={24} color="white" />
            </Pressable>
          ) : null}
          <Pressable
            className="mx-2"
            onPress={() => navigation.navigate("DirectMessageTab")}
          >
            <FontAwesome
              name="comment"
              size={30}
              color={iconColour ? iconColour : "white"}
            />
          </Pressable>
          {showFriends ? (
            <Pressable
              className="mx-2"
              onPress={() => navigation.navigate("ManageConnections")}
            >
              <FontAwesome6
                name="users"
                size={24}
                color={iconColour ? iconColour : "white"}
              />
            </Pressable>
          ) : null}
          {showSettings ? (
            <Pressable
              className="mx-2"
              onPress={() => navigation.navigate("UserSettings")}
            >
              <FontAwesome6
                name="gear"
                size={24}
                color={iconColour ? iconColour : "white"}
              />
            </Pressable>
          ) : null}
        </View>
      </SafeAreaView>

      {/* <UpdateModal show={show} userId={currentUser?.id} /> */}
    </>
  )
}

export default NavBar
