import React from "react";
import { DimensionValue } from "react-native";
import Animated, {
	Easing,
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type DropdownViewProps = {
	open?: boolean;
	children: any;
	duration?: number;
	easing?: any;
};

export const DropdownView = ({
	open = true,
	children,
	duration = 1000,
	easing = Easing.ease,
}: DropdownViewProps) => {
	const maxHeight = useSharedValue<DimensionValue>("100%");
	const opacity = useSharedValue<number>(1);
	const [contentHeight, setContentHeight] = React.useState<number>(100);

	const [showChildren, setShowChildren] = React.useState(false);

	const animatedStylesForView = useAnimatedStyle(() => ({
		maxHeight: maxHeight.value,
		opacity: opacity.value,
	}));

	React.useEffect(() => {
		maxHeight.value = withTiming(open ? contentHeight : 0, {
			duration,
			easing,
		});
		opacity.value = withTiming(open ? 1 : 0, {
			duration,
			easing,
		});
		if (open) setShowChildren(true);
		else {
			const timeout = setTimeout(() => {
				setShowChildren(false);
			}, duration + 10);
			return () => {
				clearTimeout(timeout);
			};
		}
	}, [open]);

	return (
		<Animated.View
			onLayout={({ nativeEvent }) =>
				open && setContentHeight(nativeEvent.layout.height)
			}
			style={[animatedStylesForView, { overflow: "hidden" }]}
		>
			{showChildren ? children : ""}
		</Animated.View>
	);
};
