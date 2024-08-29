import { Colors } from "@/constants/Colors";
import useColorAnimation from "@/hooks/useColorAnimation";
import useTransformAnimation from "@/hooks/useTransformAnimation";
import React, { Dispatch, SetStateAction } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type SwitchProps = {
  on?: boolean | null;
  setOn: any;
  size?: number;
};

export const SwitchWithNull = ({
  on,
  setOn = () => {},
  size = 1,
}: SwitchProps) => {
  const [wrapperColor, setWrapperColor] = React.useState(Colors.grey);
  const [wrapperBackgroundColor, finished] = useColorAnimation(wrapperColor);
  const [dotPosition, setDotPosition] = React.useState(0);
  const [dotPositionAnim] = useTransformAnimation(dotPosition);

  React.useEffect(() => {
    setDotPosition(
      on ? 35 * 2 * size + 5 * size : on === null ? 35 * size + 3 * size : 0
    );
    setWrapperColor(
      on
        ? Colors.django.primary
        : on === null
        ? Colors.primary + "44"
        : Colors.primary + "44"
    );
  }, [on, size]);

  const nextValue = (value: boolean | null) => {
    if (value === false) return null;
    if (value === null) return true;
    if (value === true) return false;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        setOn((prev: boolean | null) => (finished ? nextValue(prev) : prev))
      }
      style={{ width: 80 * size }}
    >
      <Animated.View
        style={{
          ...styles.wrapper,
          width: 120 * size,
          height: 45 * size,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 5 * size,
          borderRadius: 15 * size,
          backgroundColor: wrapperBackgroundColor,
        }}
      >
        {on === true && (
          <Text
            style={[styles.valueText, { left: 20 * size, fontSize: size * 15 }]}
          >
            True
          </Text>
        )}
        {on === false && (
          <Text
            style={[
              styles.valueText,
              { right: 20 * size, fontSize: size * 15 },
            ]}
          >
            False
          </Text>
        )}
        {on === null && (
          <>
            <Text
              style={[
                styles.valueText,
                { left: 10 * size, fontSize: size * 15 },
              ]}
            >
              NU
            </Text>
            <Text
              style={[
                styles.valueText,
                { right: 14 * size, fontSize: size * 15 },
              ]}
            >
              LL
            </Text>
          </>
        )}
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
  wrapper: {
    position: "relative",
  },
  valueText: {
    position: "absolute",
    fontWeight: "bold",
  },
});
