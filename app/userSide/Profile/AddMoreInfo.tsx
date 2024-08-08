import { View, SafeAreaView, ScrollView } from "react-native"
import { useRoute } from "@react-navigation/native"
import { RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"

import AboutMeEdit from "./AddInfoComponents/AboutMeEdit"
import InterestsEdit from "./AddInfoComponents/InterestsEdit"

const AddMoreInfo = () => {
  const route = useRoute<RouteProp<RootStackParamList, "AddMoreUserInfo">>()
  const currentUser = route.params.userProfile

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="flex-1">
          <View className="flex-1">
            <AboutMeEdit currentUserId={currentUser.id} />
          </View>

          <View className="flex-1">
            <InterestsEdit currentUserId={currentUser.id} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddMoreInfo
