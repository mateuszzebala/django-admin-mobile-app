import React from "react";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type RotateableProps = {
	rotate?: number;
	children?: any;
	duration?: number;
	easing?: any;
};

export const Rotateable = ({
	rotate = 0,
	duration = 1000,
	easing = Easing.ease,
	children,
}: RotateableProps) => {
	const rotateAngle = useSharedValue<number>(0);

	const animatedStylesForView = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotateAngle.value}deg` }],
	}));

	const rotateView = () => {
		rotateAngle.value = withTiming(rotate, {
			duration,
			easing,
		});
	};

	React.useEffect(() => {
		rotateView();
	}, [rotate]);

	return (
		<Animated.View style={[animatedStylesForView]}>{children}</Animated.View>
	);
};
