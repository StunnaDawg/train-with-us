import { View, Text, SafeAreaView } from "react-native"
import React, { useEffect, useState } from "react"
import { useAuth } from "../supabaseFunctions/authcontext"
import getUsersConnections from "../supabaseFunctions/getFuncs/getUsersConnections"
import { Profile } from "../@types/supabaseTypes"
import SearchBar from "./Events/components/SearchBar"
import BackButton from "../components/BackButton"
import MemberCard from "./Communities/components/MemberCard"

const ManageConnections = () => {
  const [userSearch, setUserSearch] = useState<string>("")
  const [profiles, setProfiles] = useState<Profile[] | null>([])
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[] | null>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    setLoading(true)
    getUsersConnections(user.id, setProfiles, setLoading)
  }, [user])

  useEffect(() => {
    if (userSearch === "") {
      setFilteredProfiles(profiles)
    } else {
      if (profiles && profiles.length > 0) {
        setFilteredProfiles(
          profiles.filter((profile) =>
            profile?.first_name
              ?.toLowerCase()
              .includes(userSearch.toLowerCase())
          )
        )
      } else {
        setFilteredProfiles([])
      }
    }
  }, [userSearch, profiles])

  useEffect(() => {}, [profiles])
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row items-center ">
        <View className="mx-1">
          <BackButton colour="black" size={28} />
        </View>
        <View className="flex-grow">
          <SearchBar
            value={userSearch}
            onChange={setUserSearch}
            placeholder="Search Connections"
          />
        </View>
      </View>

      <View>
        {loading ? (
          <Text>Loading...</Text>
        ) : filteredProfiles && filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <MemberCard key={profile.id} member={profile} />
          ))
        ) : (
          <Text>No connections found</Text>
        )}
      </View>
    </SafeAreaView>
  )
}

export default ManageConnections
