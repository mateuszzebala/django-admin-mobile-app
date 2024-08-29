import { router, Stack, useGlobalSearchParams } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { TopBarButton } from "@/components/navigation/TopBarButton";
import useConnection from "@/hooks/useConnection";
import { ROUTES } from "../routes";

export default function TabLayout() {
  const { app, modelName } = useGlobalSearchParams();

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
        headerRight: () => <></>,
        headerLeft: () => (
          <TopBarButton
            icon="arrow-left"
            onPress={() =>
              router.navigate(ROUTES.SEARCH(app + "", modelName + ""))
            }
          />
        ),
      }}
    >
      <Stack.Screen
        name="item"
        options={{
          title: "-",
        }}
      />
    </Stack>
  );
}
