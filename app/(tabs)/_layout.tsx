import { router, Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { Button } from "react-native";
import { TopBarButton } from "@/components/navigation/TopBarButton";
import { DrawerLayoutAndroid } from "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
	const drawer = React.useRef<DrawerLayoutAndroid>(null);

	const navigationView = () => (
		<View style={[styles.container, styles.navigationContainer]}></View>
	);
	return (
		<>
			<DrawerLayoutAndroid
				ref={drawer}
				drawerPosition="left"
				drawerWidth={300}
				renderNavigationView={navigationView}
			>
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
									icon={"menu"}
									onPress={() => drawer.current?.openDrawer()}
								/>
							);
						},
						headerRight: () => {
							return (
								<TopBarButton
									icon={"settings"}
									onPress={() => router.navigate("/settings")}
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
						name="create"
						options={{
							title: "Create",
							tabBarIcon: ({ color, focused }) => (
								<TabBarIcon
									name={focused ? "add-circle" : "add-circle-outline"}
									color={color}
								/>
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
			</DrawerLayoutAndroid>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
	},
	navigationContainer: {
		backgroundColor: Colors.django.primary,
	},
	paragraph: {
		padding: 16,
		fontSize: 15,
		textAlign: "center",
	},
});
