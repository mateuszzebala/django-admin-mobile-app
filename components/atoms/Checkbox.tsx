import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Flex } from "./styles/Flex";

type CheckboxProps = {
  checked?: boolean;
  setChecked?: (value: boolean) => void;
  text?: string;
  textStyle?: { [index: string]: any };
};

export const Checkbox = ({
  checked = false,
  setChecked = () => {},
  text = "",
  textStyle = {},
}: CheckboxProps) => {
  return (
    <Flex row alignItems="center" gap={10}>
      <Pressable
        style={[
          styles.wrapper,
          { backgroundColor: checked ? Colors.django.primary : Colors.grey },
        ]}
        onPress={() => setChecked(!checked)}
      >
        {checked && <Feather name="check" size={20} />}
      </Pressable>
      <Text style={textStyle}>{text}</Text>
    </Flex>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 2,
    borderRadius: 5,
    height: 30,
    width: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
