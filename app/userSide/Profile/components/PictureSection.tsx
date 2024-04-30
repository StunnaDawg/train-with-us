import { View, Text } from "react-native"
import React from "react"
import SinglePic from "../../../components/SinglePic"
import { Profile } from "../../../@types/supabaseTypes"

type PictureSectionProps = {
  profile: Profile | null
}

const PictureSection = ({ profile }: PictureSectionProps) => {
  return (
    <View className="flex flex-row flex-wrap justify-center mt-3">
      {/* <View className="m-1"> */}
      {/* <SinglePic
          size={125}
          avatarRadius={10}
          noAvatarRadius={10}
          picNumber={0}
        />
      </View>
      <View className="m-1">
        <SinglePic
          size={125}
          avatarRadius={10}
          noAvatarRadius={10}
          picNumber={0}
        />
      </View>
      <View className="m-1">
        <SinglePic
          size={125}
          avatarRadius={10}
          noAvatarRadius={10}
          picNumber={0}
        />
      </View>
      <View className="m-1">
        <SinglePic
          size={125}
          avatarRadius={10}
          noAvatarRadius={10}
          picNumber={0}
        />
      </View>
      <View className="m-1">
        <SinglePic
          size={125}
          avatarRadius={10}
          noAvatarRadius={10}
          picNumber={0}
        />
      </View>
      <View className="m-1">
        <SinglePic
          size={125}
          avatarRadius={10}
          noAvatarRadius={10}
          picNumber={0}
        />
      </View> */}
    </View>
  )
}

export default PictureSection
