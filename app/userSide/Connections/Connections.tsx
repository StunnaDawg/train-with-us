import { View } from "react-native"
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

  return (
    <View>
      {connectionProfiles ? (
        <ConnectionsCard profile={connectionProfiles[0]} />
      ) : null}
    </View>
  )
}

export default Connections
