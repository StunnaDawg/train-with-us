import { View, Text, ScrollView, Pressable } from "react-native"
import React from "react"
import SinglePic from "../../../components/SinglePic"

const PhotoArray = () => {
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="m-1">
          <SinglePic
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            picNumber={0}
          />
        </View>

        <View className="m-1">
          <SinglePic
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            picNumber={0}
          />
        </View>
        <View className="m-1">
          <SinglePic
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            picNumber={0}
          />
        </View>
        <View className="m-1">
          <SinglePic
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            picNumber={0}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default PhotoArray
