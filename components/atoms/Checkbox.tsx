import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

type CheckboxProps = {
	checked?: boolean;
	setChecked?: () => void;
};

export const Checkbox = ({
	checked = false,
	setChecked = () => {},
}: CheckboxProps) => {
	return (
		<View
			style={[
				styles.wrapper,
				{ backgroundColor: checked ? Colors.django.primary : Colors.grey },
			]}
		>
			{checked && <Feather name="check" size={21} />}
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		padding: 2,
		borderRadius: 5,
		height: 25,
		width: 25,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
});
