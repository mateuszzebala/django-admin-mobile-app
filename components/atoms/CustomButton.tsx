import { Colors } from "@/constants/Colors";
import { getBestContrastColor } from "@/utils/themeUtils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type CustomButtonProps = {
	children?: string;
	isLoading?: boolean;
	backgroundColor?: string;
	icon?: ReactElement | null;
	iconPosition?: "left" | "right";
	style?: any;
	onPress?: () => void;
};

export const CustomButton = ({
	children,
	isLoading = false,
	backgroundColor = Colors.django.primary,
	icon = null,
	iconPosition = "left",
	style = {},
	...props
}: CustomButtonProps) => {
	const rotateLoadingAngle = useSharedValue<number>(0);

	const animatedStylesForLoadingIcon = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotateLoadingAngle.value}deg` }],
	}));

	const rotateIcon = () => {
		rotateLoadingAngle.value = withTiming(rotateLoadingAngle.value + 360, {
			duration: 1000,
			easing: Easing.linear,
		});
	};

	React.useEffect(() => {
		rotateIcon();
		const interval = setInterval(rotateIcon, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [isLoading]);

	return (
		<TouchableOpacity
			style={[
				styles.button,
				{
					backgroundColor,
				},
				style,
			]}
			disabled={isLoading}
			{...props}
		>
			<Animated.View style={[styles.loadingIcon, animatedStylesForLoadingIcon]}>
				{isLoading && (
					<MaterialCommunityIcons name="loading" size={32} color="black" />
				)}
			</Animated.View>
			{!isLoading && (
				<View style={styles.buttonContent}>
					{iconPosition == "left" && icon}
					<Text
						style={[
							styles.text,
							{
								color: getBestContrastColor(backgroundColor, [
									Colors.background,
									Colors.primary,
								]),
							},
						]}
					>
						{children}
					</Text>
					{iconPosition == "right" && icon}
				</View>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		padding: 15,
		borderRadius: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		height: 70,
		justifyContent: "center",
	},
	buttonContent: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	text: {
		color: "black",
		fontWeight: "bold",
		fontSize: 16,
	},
	loadingIcon: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		aspectRatio: "1/1",
	},
});
