import { Stack } from "expo-router";

import React from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { AppState, StyleSheet } from "react-native";
import { Layers } from "@/layers/Layers";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Layers>
        <Stack
          screenOptions={{
            headerShown: false,
            statusBarColor: Colors.django.primary,
            headerBackVisible: true,
          }}
        >
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen
            name="help"
            options={{
              headerShown: true,
              headerTitleAlign: "center",
              headerTintColor: Colors.background,
              headerBackVisible: true,
              headerTitle: "Help",
              headerStyle: {
                backgroundColor: Colors.django.primary,
              },
              headerTitleStyle: {
                fontWeight: "bold",
              },
              title: "Help",
            }}
          />
          <Stack.Screen
            name="donate"
            options={{
              headerShown: true,
              headerTitleAlign: "center",
              headerTintColor: Colors.background,
              headerBackVisible: true,
              headerTitle: "Donate",
              headerStyle: {
                backgroundColor: Colors.django.primary,
              },
              headerTitleStyle: {
                fontWeight: "bold",
              },
              title: "Donate",
            }}
          />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Layers>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.django.primary,
  },
});
