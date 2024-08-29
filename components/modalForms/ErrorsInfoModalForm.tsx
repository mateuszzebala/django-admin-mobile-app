import { StyleSheet, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { CustomButton, Flex, Typography } from "../atoms";

export const ErrorsInfoModalForm = ({
  modal = {},
  close = () => {},
  todo = (val: any) => {},
  ...props
}: any) => {
  return (
    <Flex column style={{ width: 300 }} gap={20} padding={15}>
      <Typography fontWeight={"bold"} fontSize={20}>
        Errors
      </Typography>
      {props.errors.map((error: any, errorIndex: number) => (
        <Text style={styles.error} key={errorIndex}>
          {errorIndex + 1}. {error + ""}
        </Text>
      ))}
      <CustomButton
        style={{ height: 50, padding: 0 }}
        backgroundColor={Colors.grey}
        onPress={close}
      >
        I understand
      </CustomButton>
    </Flex>
  );
};

const styles = StyleSheet.create({
  error: {
    padding: 0,
    fontWeight: "bold",
  },
});
