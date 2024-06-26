import { router, Stack, Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { TopBarButton } from "@/components/navigation/TopBarButton";
import { DrawerLayoutAndroid } from "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";

export default function TabLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: {
					backgroundColor: Colors.django.primary,
				},
				headerTintColor: Colors.background,
				headerTitleAlign: "center",
				headerTitleStyle: {
					fontWeight: "bold",
				},
				headerLeft: () => {
					return (
						<TopBarButton
							icon="arrow-left"
							onPress={() => router.navigate("/models")}
						/>
					);
				},
			}}
		>
			<Stack.Screen
				name="search"
				options={{
					title: "Search",
					headerRight: () => <TopBarButton icon={"help-circle"} />,
				}}
			/>
			<Stack.Screen
				name="create"
				options={{
					title: "Create",
				}}
			/>
		</Stack>
	);
}
