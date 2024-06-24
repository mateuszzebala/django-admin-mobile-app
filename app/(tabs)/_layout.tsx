import { router, Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { TopBarButton } from "@/components/navigation/TopBarButton";
import { DrawerLayoutAndroid } from "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";

export default function TabLayout() {
	return (
		<Tabs
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

				tabBarActiveTintColor: Colors.django.primary,
				tabBarShowLabel: false,
				tabBarStyle: {
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: 80,
					shadowRadius: 50,
				},
				tabBarItemStyle: {
					backgroundColor: Colors.background,
				},
			}}
		>
			<Tabs.Screen
				name="models"
				options={{
					title: "Models",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: "Recent Actions",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon materialIcons name={"history"} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "person-circle" : "person-circle-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	paragraph: {
		padding: 16,
		fontSize: 15,
		textAlign: "center",
	},
});
