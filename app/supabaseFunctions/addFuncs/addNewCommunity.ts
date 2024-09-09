import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import * as ImagePicker from "expo-image-picker"
import { decode } from "base64-arraybuffer"
import * as FileSystem from "expo-file-system"

const addNewCommunityToUser = async (communityId: string, userId: string) => {
  const { error } = await supabase.from("profiles").upsert({
    id: userId,
    community_created: communityId,
  })

  if (error) throw error
}

const addOwnerToCommunity = async (communityId: string, userId: string) => {
  const { error } = await supabase.from("community_members").insert([
    {
      community_id: communityId,
      user_id: userId,
      role: "owner",
      joined_at: new Date(),
      community_owner: userId,
    },
  ])

  if (error) throw error
}

const addNewCommunity = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  imageUri: ImagePicker.ImagePickerAsset,
  communityName: string,
  communityOwner: string,
  communityStyle: string,
  isCommunityPrivate: boolean,
  setNewCommunityId: Dispatch<SetStateAction<number>>
) => {
  try {
    setLoading(true)
    const base64 = await FileSystem.readAsStringAsync(imageUri.uri, {
      encoding: "base64",
    })
    const filePath = `${communityOwner}/${new Date().getTime()}.${
      imageUri.type === "image"
    }`
    const contentType = "image/png"
    await supabase.storage.from("photos").upload(filePath, decode(base64), {
      contentType: contentType,
    })

    const { data: community, error } = await supabase
      .from("communities")
      .insert([
        {
          community_title: communityName,
          community_owner: communityOwner,
          created_at: new Date(),
          community_style: communityStyle,
          community_photos: [filePath],
          community_profile_pic: filePath,
          public_community: !isCommunityPrivate,
        },
      ])
      .select("id")

    if (error) throw error
    const communtiyId = community![0].id
    setNewCommunityId(communtiyId)

    const { error: channelError } = await supabase
      .from("community_channels")
      .insert([
        {
          channel_title: "general",
          channel_type: "Text",
          community_owner: communityOwner,
          community: communtiyId,
          channel_pic: filePath,
          private: false,
        },
      ])

    if (channelError) throw channelError

    await addNewCommunityToUser(communtiyId, communityOwner)
    await addOwnerToCommunity(communtiyId, communityOwner)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default addNewCommunity
