import { Colors } from "@/constants/Colors";
import { getBestContrastColor } from "@/utils/themeUtils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Loading } from "./Loading";

type CustomButtonProps = {
  children?: string | ReactElement | ReactElement[];
  isLoading?: boolean;
  backgroundColor?: string;
  icon?: ReactElement | null;
  iconPosition?: "left" | "right";
  style?: any;
  textStyle?: any;
  onPress?: () => void;
  onLayout?: (event: any) => void;
  secondary?: boolean;
  activeOpacity?: number;
};

export const CustomButton = ({
  children,
  isLoading = false,
  backgroundColor = Colors.django.primary,
  icon = null,
  iconPosition = "left",
  style = {},
  textStyle = {},
  secondary = false,
  ...props
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        secondary ? styles.secondaryButton : styles.button,
        secondary
          ? {
              borderColor: backgroundColor,
              backgroundColor: Colors.background,
            }
          : {
              backgroundColor,
            },
        style,
      ]}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loading />}
      {!isLoading && (
        <View style={styles.buttonContent}>
          {iconPosition == "left" && icon}
          {children && (
            <Text
              style={[
                styles.text,
                textStyle,
                {
                  color: getBestContrastColor(
                    secondary ? Colors.background : backgroundColor,
                    [Colors.background, Colors.primary]
                  ),
                },
              ]}
            >
              {children}
            </Text>
          )}
          {iconPosition == "right" && icon}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    justifyContent: "center",
  },
  secondaryButton: {
    padding: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    justifyContent: "center",
    borderWidth: 3,
  },
  buttonContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    aspectRatio: "1/1",
  },
});
