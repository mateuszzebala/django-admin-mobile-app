import { Colors } from "@/constants/Colors";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";

type CodeProps = {
	children?: any;
	copyOnPress?: boolean;
};

export const Code = ({ children, copyOnPress }: CodeProps) => {
	const handleCopy = async () => {
		Clipboard.setStringAsync(children)
			.then(() => {})
			.catch(() => {});
	};

	if (copyOnPress) {
		return (
			<TouchableOpacity
				activeOpacity={0.7}
				style={styles.wrapper}
				onPress={handleCopy}
			>
				<Text style={styles.code}>{children}</Text>
			</TouchableOpacity>
		);
	}

	return (
		<View style={styles.wrapper}>
			<Text style={styles.code}>{children}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: Colors.primary,
		padding: 10,
		borderRadius: 5,
	},
	code: {
		fontSize: 10,
		color: Colors.background,
		fontFamily: "SpaceMono",
	},
});
