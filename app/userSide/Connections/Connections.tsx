import { Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import ConnectionsCard from "./components/ConnectionsCard"
import { Profile } from "../../@types/supabaseTypes"
import getConnectionProfiles from "../../supabaseFunctions/getFuncs/getConnectionsProfiles"
import { useAuth } from "../../supabaseFunctions/authcontext"

const Connections = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [connectionProfiles, setConnectionProfiles] = useState<
    Profile[] | null
  >([])

  useEffect(() => {
    if (!user) return
    getConnectionProfiles(setLoading, user?.id, setConnectionProfiles)
  }, [])

  useEffect(() => {
    console.log("connectionProfiles", connectionProfiles)
  }, [connectionProfiles])

  return (
    <View>
      {connectionProfiles && connectionProfiles?.length > 0 ? (
        <ConnectionsCard
          profile={connectionProfiles[0]}
          connectionsArray={connectionProfiles}
        />
      ) : (
        <View className="flex flex-row justify-center">
          <Text>No Users at the Moment!</Text>
        </View>
      )}
    </View>
  )
}

export default Connections
