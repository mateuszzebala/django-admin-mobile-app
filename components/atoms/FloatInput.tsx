import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type FloatInputProps = {
  placeHolder?: string;
  password?: boolean;
  setValue?: (value: number | string) => void;
  value?: string;
};

export const FloatInput = ({
  placeHolder = "",
  password = false,
  setValue = () => {},
  value,
  ...props
}: FloatInputProps) => {
  const inputRef: any = React.useRef();

  const handleFocusInput = () => {
    inputRef.current.focus();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handleFocusInput}
      style={styles.inputWrapper}
    >
      <TextInput
        cursorColor={Colors.primary}
        ref={inputRef}
        style={styles.input}
        placeholder={placeHolder}
        secureTextEntry={password}
        keyboardType="numeric"
        value={value + ""}
        onChange={(e) => {
          setValue(e.nativeEvent.text);
        }}
        {...props}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: Colors.grey,
    color: Colors.input.color,
    borderRadius: 10,
    padding: 0,
  },
  input: {
    padding: 15,
    fontSize: 17,
  },
});
