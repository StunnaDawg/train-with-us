import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import SinglePic from "../../../components/SinglePic"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { FontAwesome6 } from "@expo/vector-icons"
import {
  CommunityChannelMessages,
  Messages,
  Profile,
} from "../../../@types/supabaseTypes"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import sendMessage from "../../../supabaseFunctions/addFuncs/sendMessage"
import supabase from "../../../../lib/supabase"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import getChannelSessionMessages from "../../../supabaseFunctions/getFuncs/getChannelMessages"
import sendChannelMessage from "../../../supabaseFunctions/addFuncs/sendChannelMessage"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import upsertCommunitySession from "../../../supabaseFunctions/updateFuncs/updateCommunitySession"
import BackButton from "../../../components/BackButton"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import ChannelBottomModal from "./ChannelBottomModal"
import sendPrivateChannelMessage from "../../../supabaseFunctions/addFuncs/sendPrivateChannelMessage"
import MessageInput from "../../../components/MessageInput"

type UserMessage = {
  message: string | null
  imageUrl: string | null
}

const UserMessage = ({ message, imageUrl }: UserMessage) => {
  return (
    <View className="flex flex-row justify-end mt-2 mr-4 mb-1 ml-36">
      <View>
        {imageUrl ? (
          <View>
            <SinglePicCommunity
              skeletonRadius={10}
              size={150}
              item={imageUrl}
              avatarRadius={10}
              noAvatarRadius={10}
            />
            {message !== "" ? (
              <View className="rounded-xl bg-blue-500/80 p-2 mt-2">
                <Text className="font-bold text-xs">{message}</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View className="rounded-xl bg-blue-500/80 p-2 mt-2">
            <Text className="font-bold text-xs">{message}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

type OthersMessageProps = {
  message: string | null
  name: string | null | undefined
  id: string | null
  imageUrl: string | null
}

const OthersMessage = ({ message, name, id, imageUrl }: OthersMessageProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = () => {
    setIsPressed(true)
  }
  const handlePressOut = () => {
    setIsPressed(false)
  }

  return (
    <>
      {imageUrl ? (
        <View>
          <SinglePicCommunity
            skeletonRadius={10}
            size={150}
            item={imageUrl}
            avatarRadius={10}
            noAvatarRadius={10}
          />
          {message !== "" ? (
            <View className="flex flex-row justify-start ml-2 mr-36 mt-2">
              <View className="rounded-xl bg-slate-400/60 p-2">
                <Text className="font-bold text-xs">{message}</Text>
              </View>
            </View>
          ) : null}
        </View>
      ) : (
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => {
            if (!id) return
            navigation.navigate("ViewFullUserProfileFromMessages", {
              userId: id,
            })
          }}
          className={`${isPressed ? "bg-opacity-50" : ""} mt-2 mb-1`}
        >
          <Text className="font-bold text-xs mb-1">{name}</Text>
          <View className="flex flex-row justify-start ml-2 mr-36">
            <View className="rounded-xl bg-slate-400/60 p-2">
              <Text className="font-bold text-xs">{message}</Text>
            </View>
          </View>
        </Pressable>
      )}
    </>
  )
}

const ChannelMessageScreen = () => {
  const [loading, setLoading] = useState(false)
  const route = useRoute<RouteProp<RootStackParamList, "ChannelScreen">>()
  const channel = route.params.channelId

  const [serverMessages, setServerMessages] = useState<
    CommunityChannelMessages[] | null
  >([])
  const [messageToSend, setMessageToSend] = useState("")
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const { user } = useAuth()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["1%", "99%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const sendMessageAction = async (image: string | null) => {
    if (
      (messageToSend.trim().length === 0 && image === null) ||
      !user?.id ||
      currentUser?.first_name === null ||
      currentUser?.first_name === undefined
    ) {
      return
    }
    if (!channel.private) {
      await sendChannelMessage(
        messageToSend,
        image,
        currentUser?.expo_push_token,
        user?.id,
        channel.id,
        currentUser?.first_name,
        channel.community,
        channel.channel_title,
        channel
      )
    } else {
      await sendPrivateChannelMessage(
        messageToSend,
        image,
        user?.id,
        channel.id,
        currentUser?.first_name,
        channel.community,
        channel.channel_title,
        channel
      )
    }

    await upsertCommunitySession(channel.id, messageToSend)
    setMessageToSend("")
    getChannelSessionMessages(channel.id, setServerMessages)
  }

  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    console.log("Channel id: ", `channel_id=eq.${channel.id}`)
    getChannelSessionMessages(channel.id, setServerMessages)
    const channelSubscription = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "community_channel_messages",
          filter: `channel_id=eq.${channel.id}`,
        },
        (payload) => {
          getChannelSessionMessages(channel.id, setServerMessages)
        }
      )
      .subscribe((status, error) => {
        console.log("Subscription status:", status, error)
      })

    return () => {
      supabase.removeChannel(channelSubscription)
    }
  }, [channel])

  return (
    <SafeAreaView className="flex-1">
      <View className="mx-1">
        <BackButton size={24} />
      </View>

      <Pressable
        onPress={() => {
          handlePresentModalPress()
        }}
      >
        <View className="flex flex-row justify-center items-center">
          <View className="flex flex-row items-center">
            <Text className="font-bold text-lg mb-1 underline mx-1">
              {channel.channel_title}
            </Text>
            <FontAwesome6 name="chevron-right" size={20} color="black" />
          </View>
        </View>
      </Pressable>

      <KeyboardAvoidingView
        className="flex-1 border-transparent bg-white rounded-3xl mx-2"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
            className="mx-1"
            data={serverMessages}
            inverted={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              item.sender_id === user?.id ? (
                <UserMessage message={item.mesage} imageUrl={item.image} />
              ) : (
                <OthersMessage
                  message={item.mesage}
                  id={item.sender_id}
                  name={item.sender_name}
                  imageUrl={item.image}
                />
              )
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <MessageInput
        messageToSend={messageToSend}
        setMessageToSend={setMessageToSend}
        sendMessageAction={sendMessageAction}
        chatSessionId={channel.id}
      />
      <BottomSheetModal
        enablePanDownToClose={true}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ChannelBottomModal
          channel={channel}
          userId={user?.id}
          setLoading={setLoading}
        />
      </BottomSheetModal>
    </SafeAreaView>
  )
}

export default ChannelMessageScreen
