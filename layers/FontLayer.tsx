import React from "react";
import { LayerProps } from "./Layers";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const fonts = {
	SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	DTLProkyonT: require("../assets/fonts/DTLProkyonT.otf"),
	Montserrat: require("../assets/fonts/Montserrat-VariableFont_wght.ttf"),
	RubikBold: require("@/assets/fonts/rubik/Rubik-Black.ttf"),
	RubikLight: require("@/assets/fonts/rubik/Rubik-Light.ttf"),
	Rubik: require("@/assets/fonts/rubik/Rubik-Medium.ttf"),
};

export const FontLayer = ({ next }: LayerProps) => {
	const [loaded] = useFonts(fonts);

	React.useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <>{next}</>;
};
