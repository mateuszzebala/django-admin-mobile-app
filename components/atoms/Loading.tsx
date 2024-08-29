import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Flex } from "./styles/Flex";

type LoadingProps = {
  size?: number;
  duration?: number;
  color?: string;
  style?: { [index: string]: any };
};

export const Loading = ({
  size = 1,
  duration = 1000,
  color = Colors.primary + "88",
  style = {},
}: LoadingProps) => {
  const rotateLoadingAngle = useSharedValue<number>(0);

  const animatedStylesForLoadingIcon = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateLoadingAngle.value}deg` }],
  }));

  const rotateIcon = () => {
    rotateLoadingAngle.value = withTiming(rotateLoadingAngle.value + 360, {
      duration,
      easing: Easing.linear,
    });
    setTimeout(rotateIcon, duration);
  };

  React.useEffect(rotateIcon, []);

  return (
    <Animated.View
      style={[
        styles.loadingIcon,
        { width: 32 * size, height: 32 * size },
        animatedStylesForLoadingIcon,
        style,
      ]}
    >
      <MaterialCommunityIcons name="loading" size={32 * size} color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loadingIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  animatedStylesForLoadingIcon: {},
});

export const LoadingView = ({ ...props }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      row
      style={{ width: "100%", height: 200 }}
    >
      <Loading {...props} />
    </Flex>
  );
};
