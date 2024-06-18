import { ReactElement } from "react";
import { View } from "react-native";

type FlexProps = {
	children?: ReactElement | ReactElement[] | null;
	row?: boolean;
	column?: boolean;
	gap?: number;
	alignItems?: "center" | "flex-start" | "flex-end" | "stretch";
	style?: any;
	padding?: number;
	justifyContent?:
		| "center"
		| "flex-start"
		| "flex-end"
		| "space-between"
		| "space-around"
		| "space-evenly";
};

export const Flex = ({
	row,
	column,
	gap = 5,
	alignItems = "stretch",
	justifyContent = "flex-start",
	children,
	padding = 0,
	style = {},
	...props
}: FlexProps) => {
	if (!row && !column) throw Error("You have to specify row or column prop!");

	return (
		<View
			{...props}
			style={[
				{
					display: "flex",
					flexDirection: row ? "row" : "column",
					gap,
					alignItems,
					justifyContent,
					padding,
				},
				style,
			]}
		>
			{children}
		</View>
	);
};
