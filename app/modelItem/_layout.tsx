import { router, Stack, useGlobalSearchParams } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { TopBarButton } from "@/components/navigation/TopBarButton";

export default function TabLayout() {
	const { app, modelName } = useGlobalSearchParams();
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
							onPress={() =>
								router.navigate(
									`/model/search?modelName=${modelName}&app=${app}`
								)
							}
						/>
					);
				},
			}}
		>
			<Stack.Screen
				name="item"
				options={{
					title: "Item",
				}}
			/>
		</Stack>
	);
}
