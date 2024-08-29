import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { functions, noneFunction } from "@/utils/valueFunctions";
import { Checkbox, CustomButton, Flex, Typography } from "../atoms";

export const FieldPropertiesModalForm = ({
  modal = {},
  close = () => {},
  todo = (val: any) => {},
  ...props
}: any) => {
  const [config, setConfig] = React.useState(props.config);
  return (
    <Flex column style={{ width: 300 }} gap={10} padding={15}>
      <Flex column>
        <Typography style={{ fontWeight: "bold", fontSize: 18 }}>
          {props.fieldData.name}
        </Typography>
        <Typography style={{ fontWeight: "bold", fontSize: 14 }}>
          {props.fieldData.type}
        </Typography>
        {props.fieldData.help_text && (
          <Typography style={{ fontSize: 14 }}>
            {props.fieldData.help_text}
          </Typography>
        )}
      </Flex>
      {props.fieldData.null && (
        <Checkbox
          text="Null"
          textStyle={{ fontWeight: "bold" }}
          checked={config.nulled}
          setChecked={(value: boolean) =>
            setConfig((prev: any) => ({ ...prev, nulled: value }))
          }
        />
      )}
      <Flex row wrap>
        {!config.nulled &&
          functions
            .filter((func) => func.forFields.includes(props.fieldData.type))
            .map((func) => (
              <Pressable
                key={func.name}
                onPress={() => {
                  setConfig((prev: any) => ({
                    ...prev,
                    fnc: config.fnc.name == func.name ? noneFunction : func,
                  }));
                }}
                style={[
                  styles.functionButton,
                  {
                    backgroundColor:
                      config.fnc.name == func.name
                        ? Colors.django.primary
                        : Colors.grey,
                  },
                ]}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  {func.name == "none" ? "none" : func.name + "()"}
                </Text>
              </Pressable>
            ))}
      </Flex>
      <CustomButton
        onPress={() => {
          props.setConfig(config);
          close();
        }}
        style={{ padding: 5, height: 50 }}
      >
        Okey
      </CustomButton>
    </Flex>
  );
};

const styles = StyleSheet.create({
  error: {
    padding: 0,
    fontWeight: "bold",
  },
  functionButton: {
    backgroundColor: Colors.django.primary,
    padding: 12,
    minWidth: 80,
    borderRadius: 10,
  },
});
