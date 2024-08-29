import { StyleSheet } from "react-native";
import { CustomButton } from "./CustomButton";

type FloatingButtonProps = {
	style?: object;
	children?: any;
};

export const FloatingButton = ({
	style,
	children,
	...props
}: FloatingButtonProps) => {
	return (
		<CustomButton {...props} style={[style, styles.button]}>
			{children}
		</CustomButton>
	);
};

const styles = StyleSheet.create({
	button: {
		position: "absolute",
		top: 30,
		left: 0,
		width: 60,
		height: 60,
		backgroundColor: "red",
	},
});
