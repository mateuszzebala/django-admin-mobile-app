import { Colors } from "@/constants/Colors";
import { getBestContrastColor } from "@/utils/themeUtils";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
	Keyboard,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

type SearchInputProps = {
	placeHolder?: string;
};

export const SearchInput = ({ placeHolder }: SearchInputProps) => {
	const inputRef: any = React.useRef();

	const handleFocusInput = () => {
		inputRef.current.focus();
	};

	return (
		<TouchableOpacity
			activeOpacity={0.5}
			style={styles.wrapper}
			onPress={handleFocusInput}
		>
			<Feather
				style={styles.icon}
				name="search"
				size={20}
				color={Colors.primary}
			/>
			<TextInput
				style={styles.input}
				ref={inputRef}
				placeholderTextColor={Colors.primary + "44"}
				placeholder={placeHolder}
				cursorColor={Colors.primary}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: Colors.grey,
		display: "flex",
		flexDirection: "row",
		padding: 12,
		alignItems: "center",
		justifyContent: "flex-start",
		borderRadius: 10,
		gap: 10,
	},
	icon: {},
	input: {
		fontSize: 17,
	},
});
