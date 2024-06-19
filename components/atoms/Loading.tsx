import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type LoadingProps = {
	size?: number;
	duration?: number;
	color?: string;
};

export const Loading = ({
	size = 1,
	duration = 1000,
	color = Colors.primary,
}: LoadingProps) => {
	const rotateLoadingAngle = useSharedValue<number>(0);

	const animatedStylesForLoadingIcon = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotateLoadingAngle.value}deg` }],
	}));

	const rotateIcon = () => {
		rotateLoadingAngle.value = withTiming(rotateLoadingAngle.value + 360, {
			duration,
			easing: Easing.linear,
		});
		setTimeout(rotateIcon, duration);
	};

	React.useEffect(rotateIcon, []);

	return (
		<Animated.View
			style={[
				styles.loadingIcon,
				{ width: 32 * size, height: 32 * size },
				animatedStylesForLoadingIcon,
			]}
		>
			<MaterialCommunityIcons name="loading" size={32 * size} color={color} />
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	loadingIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	animatedStylesForLoadingIcon: {},
});
