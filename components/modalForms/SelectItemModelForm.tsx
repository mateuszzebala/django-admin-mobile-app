import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import React from "react";
import useListState from "@/hooks/useListState";
import { Colors } from "@/constants/Colors";
import { stringEllipsis } from "@/utils/stringUtils";
import useCounter from "@/hooks/useCounter";
import useApi from "@/hooks/useAPI";
import { actions } from "@/api/actions";
import { Flex, Typography } from "../atoms";
import { AutoCompleteResponse } from "@/types";

export const SelectItemModalForm = ({
  modal = {},
  close = () => {},
  todo = (val: any) => {},
  fieldData,
  itemData,
  modelData,
  ...props
}: any) => {
  const items = useListState();
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

  return (
    <Flex column padding={10} justifyContent="space-between">
      <Flex row alignItems="center" justifyContent="space-between" padding={5}>
        <Typography fontSize={18} fontWeight={"900"} style={{ padding: 10 }}>
          {fieldData.relation.model.model_name}
        </Typography>
      </Flex>
      <ScrollView
        style={{ height: 500, maxHeight: 500, minWidth: 300 }}
        onMomentumScrollEnd={() => {
          if (length.value == items.items.length) length.add(20);
        }}
      >
        <Flex column padding={0} gap={5}>
          {items.items.map((item) => (
            <Pressable
              onPress={() => {
                todo(item.pk);
                close();
              }}
              style={[
                styles.item,
                {
                  backgroundColor:
                    props.value.pk == item.pk
                      ? Colors.django.primary
                      : Colors.grey,
                },
              ]}
              key={item.pk}
            >
              <Text
                style={{
                  color: Colors.primary,
                }}
              >
                {item.pk.length < 5 ? item.pk + "." : ""}{" "}
                {stringEllipsis(item.__str__, 40)}
              </Text>
            </Pressable>
          ))}
        </Flex>
      </ScrollView>
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
