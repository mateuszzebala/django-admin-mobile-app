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
	searchError?: boolean;
};

export const SearchInput = ({
	placeHolder,
	searchError = false,
}: SearchInputProps) => {
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
			<TextInput
				style={[
					styles.input,
					{ color: searchError ? Colors.error : Colors.primary },
				]}
				ref={inputRef}
				placeholderTextColor={Colors.primary + "44"}
				placeholder={placeHolder}
				cursorColor={Colors.primary}
			/>
			<TouchableOpacity style={styles.searchButton}>
				<Feather
					style={styles.icon}
					name="search"
					size={20}
					color={Colors.primary}
				/>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: Colors.grey,
		display: "flex",
		flexDirection: "row",
		padding: 0,
		alignItems: "center",
		justifyContent: "flex-start",
		borderRadius: 10,
		gap: 10,
		overflow: "hidden",
		height: 55,
	},
	icon: {},
	input: {
		fontSize: 17,
		flex: 1,
		padding: 12,
		height: 55,
	},
	searchButton: {
		backgroundColor: Colors.django.primary,
		padding: 12,
		height: 55,
		width: 55,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
});
