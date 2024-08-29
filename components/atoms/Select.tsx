import { Colors } from "@/constants/Colors";
import { useModal } from "@/context/ModelContext";
import { Octicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SelectModalForm } from "../modalForms/SelectModalForm";

type Item = {
  text?: string;
  value?: string | number | object;
};

type SelectProps = {
  multiple?: boolean;
  emptyText?: string;
  items?: Item[];
  value?: any;
  onChange?: (val: any) => void;
  close?: () => void | undefined;
};

export const Select = ({
  multiple = false,
  emptyText = "Select",
  items = [],
  value = undefined,
  onChange = () => {},
}: SelectProps) => {
  const modal = useModal();
  const [val, setVal] = React.useState(value);

  React.useEffect(() => {
    onChange(val);
  }, [val]);

  const handleOpenModal = () => {
    modal.create({
      component: SelectModalForm,
      props: {
        items,
        value,
        multiple,
        onChange: (val: any) => setVal(val),
      },
    });
  };

  return (
    <TouchableOpacity onPress={handleOpenModal} style={styles.inputWrapper}>
      <Text numberOfLines={1} style={styles.valueText}>
        {(multiple ? val.length : val)
          ? multiple
            ? [...val]
                .map((v) => items.find((item) => item.value == v)?.text)
                .join(", ")
            : items.find((item) => item.value == val)?.text
          : emptyText}
      </Text>
      <Octicons name={"multi-select"} size={21} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: Colors.grey,
    color: Colors.input.color,
    borderRadius: 10,
    padding: 15,
    fontSize: 17,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  valueText: {
    fontSize: 17,
  },
});
