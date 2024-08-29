import { Feather, MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

type TabBarIconProps = {
  style?: object;
  materialIcons?: boolean;
  name?: any;
  color?: any;
  feather?: boolean;
};

export function TabBarIcon({
  style,
  materialIcons = false,
  feather = false,
  ...rest
}: TabBarIconProps) {
  if (materialIcons)
    return (
      <MaterialIcons
        size={31}
        style={[{ marginBottom: -3 }, style]}
        {...rest}
      />
    );
  if (feather)
    return (
      <Feather size={31} style={[{ marginBottom: -3 }, style]} {...rest} />
    );
  return <Ionicons size={31} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
