import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { router, Stack } from "expo-router";

import React, { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Layers } from "@/layers/Layers";

export default function RootLayout() {
	return (
		<ThemeProvider value={DefaultTheme}>
			<Layers>
				<SafeAreaView style={styles.container}>
					<GestureHandlerRootView>
						<StatusBar hidden={false} backgroundColor={Colors.primary} />
						<Stack
							screenOptions={{
								headerShown: false,
								statusBarColor: Colors.django.primary,
							}}
						>
							<Stack.Screen
								name="index"
								options={{ statusBarColor: Colors.django.primary }}
							/>
							<Stack.Screen
								name="settings"
								options={{
									statusBarColor: Colors.django.primary,
									headerShown: true,
									headerTitleAlign: "center",
									headerTintColor: Colors.background,
									headerBackVisible: true,
									headerTitle: "Settings",
									headerStyle: {
										backgroundColor: Colors.django.primary,
									},
									headerTitleStyle: {
										fontWeight: "bold",
									},
								}}
							/>
							<Stack.Screen name="(auth)" options={{}} />
							<Stack.Screen name="(tabs)" options={{}} />
							<Stack.Screen name="+not-found" />
						</Stack>
					</GestureHandlerRootView>
				</SafeAreaView>
			</Layers>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
