import { Textarea } from "@/components/atoms";
import { Colors } from "@/constants/Colors";
import useToggle from "@/hooks/useToggle";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { FieldProps } from "./Field";

export const JSONField = ({ fieldData, value, setValue }: FieldProps) => {
  const isValid = useToggle(true);

  React.useEffect(() => {
    if (value === "") {
      isValid.setValue(true);
      return;
    }
    try {
      JSON.parse(value);
      isValid.setValue(true);
    } catch {
      isValid.setValue(false);
    }
  }, [value]);

  return (
    <View style={{ height: 200 }}>
      <Textarea
        numberOfLines={10}
        value={value}
        onChange={({ nativeEvent }) => {
          setValue(nativeEvent.text);
        }}
        style={{
          fontFamily: "SpaceMono",
        }}
      />
      <Text
        style={{
          color: isValid.value ? Colors.success : Colors.error,
          position: "relative",
          top: -50,
          left: -20,
          textAlign: "right",
          height: 40,
        }}
      >
        <Feather name={isValid.value ? "check" : "x-circle"} size={30} />
      </Text>
    </View>
  );
};
