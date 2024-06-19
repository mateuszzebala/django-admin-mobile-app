import React from "react";
import { LayerProps } from "./Layers";
import {
	defaultFloatingButtonContext,
	FloatingButtonContext,
} from "@/context/FloatingButtonContext";
import { FloatingButton } from "@/components/atoms/FloatingButton";

export const FloatingButtonLayer = ({ next }: LayerProps) => {
	const [floatingButton, setFloatingButton] = React.useState<any>(
		defaultFloatingButtonContext
	);
	return (
		<FloatingButtonContext.Provider value={[floatingButton, setFloatingButton]}>
			<FloatingButton {...floatingButton.props}>
				{floatingButton.children}
			</FloatingButton>
			{next}
		</FloatingButtonContext.Provider>
	);
};
