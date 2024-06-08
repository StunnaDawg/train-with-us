import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import { Events } from "../../../@types/supabaseTypes"
import getSingleEvent from "../../../supabaseFunctions/getFuncs/getSingleEvent"
import { set } from "date-fns"
import formatBirthdate from "../../../utilFunctions/calculateDOB"

type ViewEventTitleProps = {
  title: string | null | undefined
  date: string | null | undefined
  eventId: number | null | undefined
  eventPhoto: string | null | undefined
  eventCommunityTitle: string | null | undefined
  eventStyle: string | null | undefined
}

const ViewEventTitle = ({
  title,
  date,
  eventId,
  eventPhoto,
  eventCommunityTitle,
  eventStyle,
}: ViewEventTitleProps) => {
  return (
    <View className="flex flex-row items-center justify-center">
      <View className="m-5  items-center">
        <Text className="text-xl font-bold text-white">
          {title ? title : "No Title"}
        </Text>
        <Text className="text-xl font-bold text-white">
          {date ? formatBirthdate(date) : "No Date"}
        </Text>
        <View className="border rounded-full mt-1 p-1 px-4 bg-white border-white">
          <Text className=" text-xl font-semibold">
            {eventCommunityTitle ? eventCommunityTitle : "No Title"}
          </Text>
        </View>
        <Text className="font-bold text-white mt-2">
          {eventStyle ? eventStyle : null}
        </Text>
      </View>

      <View className="border-white border-4">
        <SinglePic
          size={150}
          avatarRadius={0}
          noAvatarRadius={0}
          item={eventPhoto}
        />
      </View>
    </View>
  )
}

export default ViewEventTitle
