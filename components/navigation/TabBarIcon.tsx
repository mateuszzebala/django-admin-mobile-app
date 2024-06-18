// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

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
				size={28}
				style={[{ marginBottom: -3 }, style]}
				{...rest}
			/>
		);
	if (feather)
		return (
			<Feather size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
		);
	return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
