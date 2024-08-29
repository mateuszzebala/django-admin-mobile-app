import React, { ReactElement } from "react";
import { CustomButton } from "./CustomButton";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { useModal } from "@/context/ModelContext";
import { Flex } from "./styles/Flex";
import { ScrollView } from "react-native-gesture-handler";

type Element = {
  icon?: ReactElement;
  onPress?: () => void;
  text?: string;
  disabled?: boolean;
};

type DropdownButtonProps = {
  icon?: ReactElement;
  elements?: Element[];
  size?: number;
  backgroundColor?: string;
  style?: any;
  menuStyle?: any;
};

export const DropdownModalForm = ({
  close,
  elements,
}: {
  close: () => void;
  elements: any[];
}) => {
  return (
    <Flex row alignItems="center" justifyContent="center">
      <ScrollView style={styles.list}>
        <Flex column gap={5} padding={10}>
          {elements.map((element, index) => (
            <Pressable
              disabled={element.disabled}
              key={index}
              style={styles.element}
              onPress={() => {
                const fnc = element.onPress || (() => {});
                fnc();
                close();
              }}
            >
              {element.icon}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "normal",
                  color: element.disabled
                    ? Colors.primary + "44"
                    : Colors.primary,
                }}
              >
                {element.text}
              </Text>
            </Pressable>
          ))}
        </Flex>
      </ScrollView>
    </Flex>
  );
};

export const DropdownButton = ({
  icon,
  elements = [],
  size = 1,
  backgroundColor = Colors.django.primary,
  menuStyle = {},
  ...props
}: DropdownButtonProps) => {
  const modal = useModal();

  return (
    <>
      <CustomButton
        onPress={() => {
          modal.create({
            component: DropdownModalForm,
            props: { elements },
          });
        }}
        style={{
          height: 55 * size,
          width: 55 * size,
          padding: 0,
        }}
        icon={icon}
        backgroundColor={backgroundColor}
        {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  btn: {},
  menu: {
    borderRadius: 10,
    padding: 15,
    width: 200,
    display: "flex",
    gap: 12,
    flexDirection: "column",
  },
  list: {
    height: "auto",
    flexGrow: 1,
    maxHeight: 600,
  },
  element: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    backgroundColor: Colors.primary + "11",
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 300,
  },
});
