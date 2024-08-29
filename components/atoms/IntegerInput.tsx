import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type IntegerInputProps = {
  placeHolder?: string;
  value?: string;
  password?: boolean;
  setValue?: (value: number | string) => void;
};

export const IntegerInput = ({
  placeHolder = "",
  value = "",
  password = false,
  setValue = () => {},
  ...props
}: IntegerInputProps) => {
  const [val, setVal] = React.useState<number | string>(value);
  const inputRef: any = React.useRef();

  React.useEffect(() => {
    setValue(val);
  }, [val]);

  React.useEffect(() => {
    if (val != value) setVal(value);
  }, [value]);

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
        onChangeText={(value) => {
          setVal(parseInt(value) || "");
        }}
        style={styles.input}
        placeholder={placeHolder}
        value={value ? value + "" : " "}
        secureTextEntry={password}
        keyboardType="numeric"
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
