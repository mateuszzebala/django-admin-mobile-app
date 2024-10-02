import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import useListState from "@/hooks/useListState";
import { Colors } from "@/constants/Colors";
import { stringEllipsis } from "@/utils/stringUtils";
import useCounter from "@/hooks/useCounter";
import useApi from "@/hooks/useAPI";
import { actions } from "@/api/actions";
import { CustomButton, Flex, Typography } from "../atoms";
import { AutoCompleteResponse } from "@/types";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export const SelectItemsModalForm = ({
  modal = {},
  close = () => {},
  todo = (val: any) => {},
  fieldData,
  itemData,
  modelData,
  ...props
}: any) => {
  const items = useListState();
  const selectedItems = useListState(props.value.items);
  const length = useCounter(20);
  const api = useApi();

  React.useEffect(() => {
    api({
      action: actions.getAutoComplete,
      args: [
        modelData.app.label,
        modelData.model_name,
        itemData.pk,
        fieldData.name,
        { limit: length.value + "" },
      ],
      callback: (data: AutoCompleteResponse) => {
        items.setItems(data.possible_values);
      },
    });
  }, [length.value]);

  const handleSelect = () => {
    todo(selectedItems.items);
    close();
  };

  return (
    <Flex column padding={10} justifyContent="space-between">
      <Flex row alignItems="center" justifyContent="space-between" padding={5}>
        <Typography fontSize={18} fontWeight={"900"} style={{ padding: 10 }}>
          {fieldData.relation.model.model_name}
        </Typography>
      </Flex>
      <ScrollView
        style={{
          height: 500,
          maxHeight: 500,
          minWidth: 300,
        }}
        scrollEnabled
        onMomentumScrollEnd={() => {
          if (length.value == items.items.length) length.add(20);
        }}
      >
        <Flex column padding={0} gap={5}>
          {items.items.map((item) => (
            <TouchableOpacity
              onPress={() => {
                selectedItems.toggle(item.pk);
              }}
              style={[
                styles.item,
                {
                  backgroundColor: selectedItems.includes(item.pk)
                    ? Colors.django.primary
                    : Colors.grey,
                },
              ]}
              key={item.pk}
            >
              <Text
                style={{
                  color: Colors.primary,
                  maxWidth: 300,
                  textAlign: "center",
                }}
              >
                {item.pk.length < 5 ? item.pk + "." : ""}{" "}
                {stringEllipsis(item.__str__, 200)}
              </Text>
            </TouchableOpacity>
          ))}
        </Flex>
      </ScrollView>
      <Flex row justifyContent="center">
        <CustomButton
          onPress={close}
          style={styles.button}
          backgroundColor={Colors.grey}
        >
          CANCEL
        </CustomButton>
        <CustomButton style={styles.button} onPress={handleSelect}>
          SELECT
        </CustomButton>
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 19,
    borderRadius: 8,
  },
  button: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    width: 145,
  },
});
