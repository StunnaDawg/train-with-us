import { View, Text, SafeAreaView } from "react-native"
import React, { useState } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { Communities } from "../../@types/supabaseTypes"
import CommunityCard from "./components/CommunityCard"
import searchCommuntiesFunction from "../../supabaseFunctions/getFuncs/searchCommunities"
import SearchBar from "../Events/components/SearchBar"
import BackButton from "../../components/BackButton"
import { useAuth } from "../../supabaseFunctions/authcontext"

const SearchCommunities = () => {
  const { user } = useAuth()
  const [searchText, setSearchText] = useState<string>("")
  const [communities, setCommunities] = useState<Communities[] | null>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = (text: string) => {
    setSearchText(text)
    searchCommuntiesFunction(text, setCommunities, setLoading)
  }
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex flex-row items-center ">
        <View className="mx-1">
          <BackButton colour="white" size={28} />
        </View>
        <View className="flex-grow">
          <SearchBar
            value={searchText}
            onChange={(text) => handleSearch(text)}
            placeholder="Search for events"
          />
        </View>
      </View>
      <ScrollView>
        {!loading ? (
          communities && communities.length > 0 ? (
            communities.map((community) => (
              <View key={community.id} className="m-2">
                <CommunityCard community={community} userId={user!.id} />
              </View>
            ))
          ) : (
            <>
              <View className="flex-row justify-center m-2">
                <Text className="text-white text-xl font-bold">
                  No Communities found!
                </Text>
              </View>
            </>
          )
        ) : null}
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchCommunities
