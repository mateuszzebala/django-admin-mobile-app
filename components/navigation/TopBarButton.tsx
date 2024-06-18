import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type TopBarButtonProps = {
	icon: "menu" | "help-circle" | "arrow-left";
	onPress?: () => void;
};

export const TopBarButton = ({ icon, ...props }: TopBarButtonProps) => {
	return (
		<TouchableOpacity style={styles.button} {...props}>
			<Feather name={icon} size={28} color={Colors.background} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingLeft: 15,
		paddingRight: 15,
	},
});
