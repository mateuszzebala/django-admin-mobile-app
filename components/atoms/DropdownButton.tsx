import React, { ReactElement } from "react";
import { CustomButton } from "./CustomButton";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import Collapsible from "react-native-collapsible";
import useToggle from "@/hooks/useToggle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useModal } from "@/context/ModelContext";

type Element = {
	icon?: ReactElement;
	onPress?: () => void;
	text?: string;
	disabled?: boolean;
};

type DropdownButtonProps = {
	icon?: ReactElement;
	elements?: Element[];
	size?: number;
	backgroundColor?: string;
	style?: any;
	menuStyle?: any;
};

export const DropdownModalForm = ({
	close,
	elements,
}: {
	close: () => void;
	elements: any[];
}) => {
	return (
		<View style={styles.list}>
			{elements.map((element, index) => (
				<TouchableOpacity
					disabled={element.disabled}
					key={index}
					style={styles.element}
					onPress={() => {
						const fnc = element.onPress || (() => {});
						fnc();
						close();
					}}
				>
					{element.icon || (
						<MaterialCommunityIcons name="circle-medium" size={20} />
					)}
					<Text
						style={{
							fontSize: 20,
							fontWeight: "bold",
							color: element.disabled ? Colors.primary + "44" : Colors.primary,
						}}
					>
						{element.text}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export const DropdownButton = ({
	icon,
	elements = [],
	size = 1,
	backgroundColor = Colors.django.primary,
	menuStyle = {},
	...props
}: DropdownButtonProps) => {
	const modal = useModal();

	return (
		<>
			<CustomButton
				onPress={() => {
					modal.create({
						component: DropdownModalForm,
						props: { elements },
					});
				}}
				style={{
					height: 55 * size,
					width: 55 * size,
					padding: 0,
				}}
				icon={icon}
				backgroundColor={backgroundColor}
				{...props}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	btn: {},
	menu: {
		borderRadius: 10,
		padding: 15,
		width: 200,
		display: "flex",
		gap: 12,
		flexDirection: "column",
	},
	list: {
		display: "flex",
		flexDirection: "column",
		padding: 5,
		gap: 5,
	},
	element: {
		display: "flex",
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		backgroundColor: Colors.grey,
		padding: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		minWidth: 200,
	},
});
