import { Colors } from "@/constants/Colors";
import { ReactElement } from "react";
import { Text } from "react-native";

type TypographyProps = {
	children?: any;
	fontSize?: number;
	fontWeight?: any;
	color?: string;
	fontFamily?: string;
	style?: object;
};

export const Typography = ({
	children,
	fontSize,
	fontWeight,
	fontFamily,
	color = Colors.primary,
	style = {},
}: TypographyProps) => {
	return (
		<Text style={[{ fontFamily, fontSize, fontWeight, color }, style]}>
			{children}
		</Text>
	);
};
