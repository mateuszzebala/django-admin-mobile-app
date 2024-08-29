import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomButton } from "./CustomButton";
import React from "react";
import { Colors } from "@/constants/Colors";
import ColorPicker, { HueSlider } from "reanimated-color-picker";
import { useModal } from "@/context/ModelContext";
import { CustomInput } from "./CustomInput";

export const ColorInput = ({ selectColorText = "SELECT COLOR" }) => {
	const [color, setColor] = React.useState<string | null>("#000000");
	const modal = useModal();

	const handleSelectColor = () => {
		modal.create({
			component: () => {
				return (
					<ColorPicker
						value="#000000"
						thumbInnerStyle={{}}
						style={{
							padding: 20,
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
							gap: 20,
						}}
						onChange={(event) => setColor(event.hex)}
						boundedThumb
					>
						<HueSlider style={{ width: 200 }} />
						<CustomInput wrapperStyle={{ width: "100%" }} />
						<CustomButton style={{ width: "100%" }}>SELECT</CustomButton>
					</ColorPicker>
				);
			},
			todo: () => {},
		});
	};

	return (
		<CustomButton
			style={styles.wrapper}
			onPress={handleSelectColor}
			backgroundColor={color || Colors.grey}
		>
			{color || selectColorText}
		</CustomButton>
	);
};

const styles = StyleSheet.create({
	wrapper: {},
});
