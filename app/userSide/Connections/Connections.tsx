import { RefreshControl, ScrollView, Text, View } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import ConnectionsCard from "./components/ConnectionsCard"
import { Profile } from "../../@types/supabaseTypes"
import getConnectionProfiles from "../../supabaseFunctions/getFuncs/getConnectionsProfiles"
import { useAuth } from "../../supabaseFunctions/authcontext"

const Connections = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [newConnection, setNewConnection] = useState<boolean>(false)
  const [connectionProfiles, setConnectionProfiles] = useState<Profile[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])
  useEffect(() => {
    if (!user) return
    getConnectionProfiles(setLoading, user?.id, setConnectionProfiles)
  }, [])

  useEffect(() => {
    if (!user) return
    getConnectionProfiles(setLoading, user?.id, setConnectionProfiles)
  }, [refreshing])

  useEffect(() => {
    if (!user) return // Make sure user exists before proceeding.

    // Assuming `newConnection` triggers a refresh of profiles.
    if (newConnection && connectionProfiles.length > 0) {
      setConnectionProfiles((prevProfiles) => prevProfiles.slice(1))
    }
  }, [newConnection])

  useEffect(() => {
    if (connectionProfiles)
      console.log("gottenn profiles", [...connectionProfiles])
  }, [connectionProfiles])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {connectionProfiles && connectionProfiles?.length > 0 ? (
        <ConnectionsCard
          setLoading={setNewConnection}
          loading={newConnection}
          profile={connectionProfiles[0]}
        />
      ) : (
        <View className="flex flex-row justify-center">
          <Text>No Users at the Moment!</Text>
        </View>
      )}
    </ScrollView>
  )
}

export default Connections
