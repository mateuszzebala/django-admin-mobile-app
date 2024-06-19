import { Colors } from "@/constants/Colors";
import { ReactElement } from "react";
import { Text } from "react-native";

type TypographyProps = {
	children?: any;
	fontSize?: number;
	fontWeight?: any;
	color?: string;
	fontFamily?: string;
};

export const Typography = ({
	children,
	fontSize,
	fontWeight,
	fontFamily,
	color = Colors.primary,
}: TypographyProps) => {
	return (
		<Text style={{ fontFamily, fontSize, fontWeight, color }}>{children}</Text>
	);
};
