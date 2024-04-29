import { decode } from "base64-arraybuffer"
import supabase from "../../../lib/supabase"
import { Dispatch, SetStateAction } from "react"

const uploadImage = async (
  base64Content: string, // Base64 encoded content of the image
  fileName: string, // Name of the file to save as in storage
  setUrl: Dispatch<SetStateAction<string>>
) => {
  // Decode the base64 string to a buffer
  const buffer = decode(base64Content)

  // Upload the file to Supabase Storage
  const { data, error } = await supabase.storage
    .from("photos")
    .upload(fileName, buffer, {
      contentType: "image/png",
    })

  if (error) throw new Error(error.message)

  console.log("Upload Data:", data)

  const { data: publicURL } = supabase.storage
    .from("photos")
    .getPublicUrl(fileName)

  // Check if publicURL is obtained successfully
  if (!publicURL) {
    throw new Error("Failed to retrieve public URL.")
  }

  console.log("Public URL:", publicURL)
  setUrl(publicURL.publicUrl)

  return data
}

export default uploadImage
