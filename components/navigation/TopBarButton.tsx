import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type TopBarButtonProps = {
  icon: "menu" | "help-circle" | "arrow-left" | "save";
  onPress?: () => void;
  color?: string;
};

export const TopBarButton = ({
  icon,
  color = Colors.background,
  ...props
}: TopBarButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Feather name={icon} size={28} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
