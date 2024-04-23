import React from "react"
import { useState, useEffect, SetStateAction, Dispatch, ReactNode } from "react"
import { ImageBackground, StyleSheet, View } from "react-native"

type SinglePicProps = {
  photo: string
  height: number
  width: number
  avatarRadius: number
  noAvatarRadius: number
  docRef: string
  children: ReactNode
  setLoading: Dispatch<SetStateAction<boolean>>
}

const ImageBackgroundComponentEvent = ({
  photo,
  height,
  width,
  avatarRadius,
  noAvatarRadius,
  docRef,
  children,
  setLoading,
}: SinglePicProps) => {
  const avatarSize = { height: height, width: width }

  const styles = StyleSheet.create({
    avatar: {
      borderRadius: 0,
      overflow: "hidden",
      maxWidth: "100%",
    },
    image: {
      objectFit: "cover",
      paddingTop: 0,
    },
    noImage: {
      backgroundColor: "#333",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "rgb(200, 200, 200)",
      borderRadius: noAvatarRadius,
    },
  })

  return (
    <ImageBackground
      source={{ uri: photo || "assets/adaptive-icon.png" }}
      style={[avatarSize, styles.avatar]}
      imageStyle={styles.image}
    >
      {children}
    </ImageBackground>
  )
}

export default ImageBackgroundComponentEvent
