import { View, Text, SafeAreaView, ActivityIndicator } from "react-native"
import React, { useState } from "react"
import { Profile } from "../../@types/supabaseTypes"
import searchUsersFunction from "../../supabaseFunctions/getFuncs/searchUsers"
import SearchBar from "../Events/components/SearchBar"
import { ScrollView } from "react-native"
import MemberCard from "../Communities/components/MemberCard"
import BackButton from "../../components/BackButton"

const SearchUsers = () => {
  const [searchText, setSearchText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<Profile[] | null>([])

  const handleSearch = (text: string) => {
    setSearchText(text)
    searchUsersFunction(text, setUsers, setLoading)
  }
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row items-center ">
        <View className="mx-1">
          <BackButton size={28} />
        </View>
        <View className="flex-grow">
          <SearchBar
            value={searchText}
            onChange={(text) => handleSearch(text)}
            placeholder="Search for Users"
          />
        </View>
      </View>

      <ScrollView className=" h-full">
        {!loading ? (
          users?.map((member) => {
            return <MemberCard key={member.id} member={member} />
          })
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchUsers
