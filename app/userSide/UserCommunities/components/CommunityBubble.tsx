import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { Communities } from "../../../@types/supabaseTypes"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"
import SinglePic from "../../../components/SinglePic"

type CommunityBubbleProps = {
  community: number
}

const CommunityBubble = ({ community }: CommunityBubbleProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentCommunity, setCurrentCommunity] = useState<Communities | null>(
    {} as Communities
  )
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user || community === null) return

    getSingleCommunity(setLoading, community, setCurrentCommunity)
  }, [user])

  useEffect(() => {
    if (currentCommunity?.community_photos === null || undefined) return
    setImageFiles(currentCommunity?.community_photos)
  }, [currentCommunity])
  return (
    <SinglePic
      size={55}
      avatarRadius={100}
      noAvatarRadius={100}
      item={imageFiles?.[0]}
    />
  )
}

export default CommunityBubble
