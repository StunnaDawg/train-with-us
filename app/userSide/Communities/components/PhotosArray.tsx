import { View, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { Communities } from "../../../@types/supabaseTypes"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { MotiView } from "moti"
import { Skeleton } from "moti/skeleton"

type PhotoArrayProps = {
  community: Communities
}

const PhotoArray = ({ community }: PhotoArrayProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentCommunity, setCurrentCommunity] = useState<Communities | null>(
    {} as Communities
  )
  const { user } = useAuth()
  const colorMode = "dark"

  useEffect(() => {
    if (!user) return

    getSingleCommunity(setLoading, community.id, setCurrentCommunity)
  }, [user])

  return (
    <>
      {!loading ? (
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {currentCommunity?.community_photos?.[0] ? (
              <View className="m-1">
                <SinglePicCommunity
                  allowExpand={true}
                  size={165}
                  avatarRadius={10}
                  noAvatarRadius={10}
                  item={currentCommunity?.community_photos?.[0]}
                  skeletonRadius={"square"}
                  allowCacheImage={false}
                />
              </View>
            ) : null}

            {currentCommunity?.community_photos?.[1] ? (
              <View className="m-1">
                <SinglePicCommunity
                  allowExpand={true}
                  size={165}
                  avatarRadius={10}
                  noAvatarRadius={10}
                  item={currentCommunity?.community_photos?.[1]}
                  skeletonRadius={"square"}
                  allowCacheImage={false}
                />
              </View>
            ) : null}
            {currentCommunity?.community_photos?.[2] ? (
              <View className="m-1">
                <SinglePicCommunity
                  allowExpand={true}
                  size={165}
                  avatarRadius={10}
                  noAvatarRadius={10}
                  item={currentCommunity?.community_photos?.[2]}
                  skeletonRadius={"square"}
                  allowCacheImage={false}
                />
              </View>
            ) : null}
            {currentCommunity?.community_photos?.[3] ? (
              <View className="m-1">
                <SinglePicCommunity
                  allowExpand={true}
                  size={165}
                  avatarRadius={10}
                  noAvatarRadius={10}
                  item={currentCommunity?.community_photos?.[3]}
                  skeletonRadius={"square"}
                  allowCacheImage={false}
                />
              </View>
            ) : null}
          </ScrollView>
        </View>
      ) : (
        <MotiView
          transition={{
            type: "timing",
          }}
          className="items-center mx-3 flex flex-row justify-center"
          animate={{ backgroundColor: "#07182d" }}
        >
          <View className="flex flex-row">
            <View className="m-1">
              <Skeleton
                colorMode={colorMode}
                radius="square"
                height={165}
                width={165}
              />
            </View>
            <View className="m-1">
              <Skeleton
                colorMode={colorMode}
                radius="square"
                height={165}
                width={165}
              />
            </View>
            <View className="m-1">
              <Skeleton
                colorMode={colorMode}
                radius="square"
                height={165}
                width={165}
              />
            </View>
          </View>
        </MotiView>
      )}
    </>
  )
}

export default PhotoArray
