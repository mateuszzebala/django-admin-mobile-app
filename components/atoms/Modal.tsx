import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Typography } from "./Typography";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import { useUnstableGlobalHref } from "expo-router";
import useColorAnimation from "@/hooks/useColorAnimation";

import Reanimated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type ModalType = {
  title?: string;
  children?: any;
  close?: () => void;
  withTopBar?: boolean;
  startUrl?: string;
};

export const Modal = ({
  title,
  children,
  close = () => {},
  withTopBar = false,
  startUrl = "/",
}: ModalType) => {
  const url = useUnstableGlobalHref();
  //   const { height } = useWindowDimensions();
  const pressableRef = React.useRef<any>();
  const pressableId = React.useId();
  const [backColor, setBackColor] = React.useState(Colors.primary + "00");
  const [backgroundColor] = useColorAnimation(backColor);

  React.useEffect(() => {
    setBackColor(Colors.primary + "44");
  }, []);

  React.useEffect(() => {
    if (startUrl != null && startUrl != url) close();
  }, [url]);

  return (
    <SafeAreaView style={{ flex: 1, position: "absolute", top: 0, left: 0 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.wrapper]}
      >
        <Animated.View
          style={{
            backgroundColor: backgroundColor,
            width: "100%",
            height: "100%",
          }}
        >
          <Pressable
            ref={pressableRef}
            id={pressableId}
            nativeID={pressableId}
            style={{
              backgroundColor: "#00000000",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={(event) => {
              if (event.target === pressableRef.current) {
                close();
              }
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <Reanimated.View style={[styles.modal]}>
              {withTopBar && (
                <View style={styles.topbar}>
                  <Feather name="menu" size={25} color={Colors.primary} />
                  <Typography fontSize={21}>{title}</Typography>
                  <TouchableOpacity onPress={close}>
                    <Feather name="x" size={25} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              )}
              <View>{children}</View>
            </Reanimated.View>
          </Pressable>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "auto",
    height: "auto",
    backgroundColor: Colors.background,
    overflow: "hidden",
    borderRadius: 10,
    padding: 0,
  },
  topbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
