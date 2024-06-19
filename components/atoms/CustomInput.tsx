import { Colors } from "@/constants/Colors";
import React from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

type CustomInputProps = {
	placeHolder?: string;
	value?: string;
	password?: boolean;
	onChange?: ({ nativeEvent }: { nativeEvent: any }) => void;
};

export const CustomInput = ({
	placeHolder = "",
	value,
	password = false,
	onChange = () => {},
	...props
}: CustomInputProps) => {
	const inputRef: any = React.useRef();

	const handleFocusInput = () => {
		inputRef.current.focus();
	};

	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={handleFocusInput}
			style={styles.inputWrapper}
		>
			<TextInput
				cursorColor={Colors.primary}
				ref={inputRef}
				onChange={onChange}
				style={styles.input}
				placeholder={placeHolder}
				value={value}
				secureTextEntry={password}
				{...props}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	inputWrapper: {
		backgroundColor: Colors.grey,
		color: Colors.input.color,
		borderRadius: 10,
		padding: 0,
	},
	input: {
		padding: 15,
		fontSize: 20,
	},
});
