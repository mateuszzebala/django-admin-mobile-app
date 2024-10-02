import { router, Stack, Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { TopBarButton } from "@/components/navigation/TopBarButton";
import useConnection from "@/hooks/useConnection";
import { ROUTES } from "../routes";

export default function TabLayout() {
  const connection = useConnection();

  React.useEffect(() => {
    if (!connection.isConnected()) router.navigate(ROUTES.INDEX());
  }, [connection]);

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
        headerBackVisible: true,
      }}
    >
      <Stack.Screen
        name="search"
        options={{
          title: "Search",
          headerRight: () => (
            <TopBarButton
              icon={"help-circle"}
              onPress={() => router.push(ROUTES.SEARCH_HELP())}
            />
          ),
        }}
      />
      <Stack.Screen
        name="searchHelp"
        options={{
          title: "Help",
        }}
      />
    </Stack>
  );
}
