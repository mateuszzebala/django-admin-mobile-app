import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import React from "react";
import { CustomInput, Flex, Typography } from "../atoms";

export const PromptModalForm = ({
  modal = {},
  close = () => {},
  todo = (val: any) => {},
  ...props
}: any) => {
  const [inputValue, setInputValue] = React.useState(props.initValue || "");
  return (
    <Flex column style={{ width: 300 }} gap={20} padding={15}>
      {modal.text && (
        <Typography
          fontSize={20}
          fontWeight={"bold"}
          style={{ textAlign: "center" }}
        >
          {modal.text}
        </Typography>
      )}
      <CustomInput
        autofocus
        {...props}
        value={inputValue}
        onChange={({ nativeEvent }) => {
          setInputValue(nativeEvent.text);
        }}
      />
      <Flex
        justifyContent="center"
        alignItems="center"
        gap={0}
        row
        style={{ width: "100%" }}
      >
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.background }]}
          onPress={close}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            CANCEL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            todo(inputValue);
            close();
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>OK</Text>
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.django.primary,
    padding: 15,
    width: 135,
    borderRadius: 10,
  },
});
