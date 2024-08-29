import { Colors } from "@/constants/Colors";
import useColorAnimation from "@/hooks/useColorAnimation";
import useTransformAnimation from "@/hooks/useTransformAnimation";
import React, { Dispatch, SetStateAction } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type SwitchProps = {
  on?: boolean;
  setOn: Dispatch<SetStateAction<boolean>>;
  size?: number;
};

export const Switch = ({ on, setOn = () => {}, size = 1 }: SwitchProps) => {
  const [wrapperColor, setWrapperColor] = React.useState(Colors.primary + "44");
  const [wrapperBackgroundColor, finished] = useColorAnimation(wrapperColor);
  const [dotPosition, setDotPosition] = React.useState(0);
  const [dotPositionAnim] = useTransformAnimation(dotPosition);

  React.useEffect(() => {
    setDotPosition(on ? 35 * size : 0);
    setWrapperColor(on ? Colors.django.primary : Colors.primary + "44");
  }, [on, size]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setOn((prev) => (finished ? !prev : prev))}
      style={{ width: 80 * size }}
    >
      <Animated.View
        style={{
          ...styles.wrapper,
          width: 80 * size,
          height: 45 * size,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 5 * size,
          borderRadius: 15 * size,
          backgroundColor: wrapperBackgroundColor,
        }}
      >
        <Animated.View
          style={{
            width: 35 * size,
            height: 35 * size,
            borderRadius: 15 * size - 5,
            transform: [{ translateX: dotPositionAnim }],
            backgroundColor: Colors.background,
          }}
        ></Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
});
