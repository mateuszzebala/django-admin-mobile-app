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
				tabBarActiveTintColor: Colors.django.primary,
				headerShown: true,
				tabBarShowLabel: false,
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
				name="search"
				options={{
					title: "Search",
					tabBarIcon: ({ color }) => (
						<TabBarIcon feather name={"search"} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					title: "Create",
					tabBarIcon: ({ color }) => (
						<TabBarIcon feather name={"plus"} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="update"
				options={{
					title: "Update",
					tabBarIcon: ({ color }) => (
						<TabBarIcon feather name={"edit"} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="delete"
				options={{
					title: "Delete",
					tabBarIcon: ({ color }) => (
						<TabBarIcon feather name={"trash"} color={color} />
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
