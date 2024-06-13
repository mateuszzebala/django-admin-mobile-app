import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
		<Pressable onPress={handleFocusInput} style={styles.inputWrapper}>
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
		</Pressable>
	);
};

const styles = StyleSheet.create({
	inputWrapper: {
		backgroundColor: Colors.input.background,
		color: Colors.input.color,
		borderColor: Colors.input.borderColor,
		borderWidth: 5,
		borderRadius: 10,
		padding: 0,
	},
	input: {
		padding: 15,
		fontSize: 20,
	},
});
