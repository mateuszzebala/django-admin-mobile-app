import { Colors } from "@/constants/Colors";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDocumentAsync } from "expo-document-picker";
import { Feather } from "@expo/vector-icons";
import { stringEllipsis } from "@/utils/stringUtils";

export const FileInput = ({ value, setValue, text = "Select file" }: any) => {
  const handlePress = async () => {
    await getDocumentAsync({ type: "*/*", multiple: false }).then((result) => {
      if (!result.canceled) {
        const { name, uri, mimeType } = result.assets[0];
        setValue({
          name,
          type: mimeType,
          uri,
        });
      }
    });
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.inputWrapper}>
      <Feather name="upload" size={20} />
      <Text style={styles.value}>
        {value.value ? stringEllipsis(value.name, 30) : text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: Colors.grey,
    color: Colors.input.color,
    borderRadius: 10,
    padding: 0,
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  value: {
    padding: 18,
    fontSize: 17,
  },
});
