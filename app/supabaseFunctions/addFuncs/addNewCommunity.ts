import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import * as ImagePicker from "expo-image-picker"
import { decode } from "base64-arraybuffer"
import * as FileSystem from "expo-file-system"

const addNewCommunity = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  imageUri: ImagePicker.ImagePickerAsset,
  communityName: string,
  communityOwner: string,
  communityStyle: string
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
        },
      ])
      .select("id")

    if (error) throw error
    const communtiyId = community![0].id
    return communtiyId
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default addNewCommunity
