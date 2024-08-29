import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Checkbox } from "../atoms/Checkbox";
import { CustomButton } from "../atoms/CustomButton";

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

export const SelectModalForm = ({
  items = [],
  value,
  onChange = () => {},
  multiple,
  close = () => {},
}: SelectProps) => {
  const [val, setVal] = React.useState(value);

  React.useEffect(() => {
    onChange(val);
  }, [val]);

  return (
    <View style={styles.modalRootWrapper}>
      <ScrollView style={{ maxHeight: 700, width: 350 }}>
        <View style={styles.modalWrapper}>
          {items.map((item, index) => {
            const selected = multiple
              ? val.includes(item.value)
              : val == item.value;

            const handlePress = () => {
              if (multiple) {
                if (val.includes(item.value))
                  setVal((prev: any) =>
                    prev.filter((val: any) => val != item.value)
                  );
                else setVal((prev: any[]) => [...prev, item.value]);
              } else {
                if (val == item.value) setVal(null);
                else setVal(item.value);
              }
            };

            return (
              <TouchableOpacity
                style={[styles.option]}
                key={index}
                onPress={handlePress}
              >
                <Checkbox checked={selected} />
                <Text style={[styles.optionText]}>{item.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.modalButtons}>
        <CustomButton onPress={close} style={styles.modalButton}>
          OK
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: 8,
    width: 350,
  },
  option: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: Colors.primary + "11",
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  optionText: {
    fontSize: 17,
  },
  modalRootWrapper: {
    padding: 10,
    gap: 10,
    display: "flex",
    height: 780,
    justifyContent: "space-between",
  },
  modalButtons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
  },
  modalButton: {
    width: 330,
    height: 50,
  },
});
