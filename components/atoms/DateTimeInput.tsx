import { Colors } from "@/constants/Colors";
import { dateFunctions } from "@/utils/utils";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type DateTimeInputProps = {
	time?: boolean;
	date?: boolean;
};

export const DateTimeInput = ({ time, date }: DateTimeInputProps) => {
	const [value, setValue] = React.useState<Date>(new Date());
	if (!time && !date)
		throw new Error(
			"You need to specify one or more types of the DateTimeInput"
		);

	const handleInputPress = async () => {
		if (date && !time) {
			DateTimePickerAndroid.open({
				mode: "date",
				value,
				onChange: (_, date) => {
					if (date) setValue(date);
				},
				timeZoneName: "UTC",
			});
		}
		if (date && time) {
			DateTimePickerAndroid.open({
				mode: "date",
				value,
				timeZoneName: "UTC",
				onChange: (event, date) => {
					if (event.type === "dismissed") return;
					DateTimePickerAndroid.open({
						mode: "time",
						value,
						timeZoneName: "UTC",
						onChange: (_, time) => {
							if (time && date) {
								const newDate = new Date(
									date.getFullYear(),
									date.getMonth(),
									date.getDate(),
									time.getHours(),
									time.getMinutes(),
									time.getSeconds()
								);
								setValue(newDate);
							}
						},
					});
				},
			});
		}
		if (time && !date) {
			DateTimePickerAndroid.open({
				mode: "time",
				value,
				timeZoneName: "UTC",
				onChange: (_, time) => {
					if (time) setValue(time);
				},
			});
		}
	};

	return (
		<TouchableOpacity
			onPress={handleInputPress}
			activeOpacity={0.5}
			style={styles.inputWrapper}
		>
			<View style={styles.input}>
				{time && (
					<Text style={styles.text}>{dateFunctions.getTimeString(value)}</Text>
				)}
				{time && date && <Text>-</Text>}
				{date && (
					<Text style={styles.text}>{dateFunctions.getDateString(value)}</Text>
				)}
			</View>
			<Text>UTC</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	inputWrapper: {
		backgroundColor: Colors.grey,
		color: Colors.input.color,
		borderRadius: 10,
		padding: 0,
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		paddingRight: 20,
	},
	input: {
		padding: 15,

		display: "flex",
		flexDirection: "row",
		gap: 5,
	},
	text: {
		fontSize: 17,
	},
});
