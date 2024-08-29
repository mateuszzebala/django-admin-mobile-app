import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { Typography, Flex } from "../atoms";
import React from "react";

export const ConfirmModalForm = ({
  modal = {},
  close = () => {},
  todo = (val: any) => {},
  ...props
}: any) => {
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
      <Flex
        justifyContent="center"
        alignItems="center"
        gap={5}
        row
        style={{ width: "100%" }}
      >
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.grey }]}
          onPress={close}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            {props.noButtonText || "CANCEL  "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            todo(true);
            close();
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            {props.yesButtonText || "OK"}
          </Text>
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
