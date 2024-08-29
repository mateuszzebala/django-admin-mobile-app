import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type TextareaProps = {
  placeHolder?: string;
  value?: string;
  password?: boolean;
  onChange?: ({ nativeEvent }: { nativeEvent: any }) => void;
  autofocus?: boolean;
  numberOfLines?: number;
  wrapperStyle?: object;
  style?: object;
};

export const Textarea = ({
  placeHolder = "",
  value,
  password = false,
  onChange = () => {},
  autofocus = false,
  style = {},
  wrapperStyle = {},
  ...props
}: TextareaProps) => {
  const inputRef: any = React.useRef();

  const handleFocusInput = () => {
    inputRef.current.focus();
  };

  React.useEffect(() => {
    if (autofocus) handleFocusInput();
  }, [autofocus]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handleFocusInput}
      style={[styles.inputWrapper, wrapperStyle]}
    >
      <TextInput
        multiline
        cursorColor={Colors.primary}
        numberOfLines={5}
        ref={inputRef}
        onChange={onChange}
        style={[styles.input, style]}
        placeholder={placeHolder}
        value={value}
        secureTextEntry={password}
        verticalAlign="top"
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
    textAlignVertical: "top",
  },
});
