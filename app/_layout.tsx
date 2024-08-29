import { Stack } from "expo-router";

import React from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Layers } from "@/layers/Layers";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Layers>
        <SafeAreaView style={styles.container}>
          <StatusBar hidden={false} backgroundColor={Colors.django.primary} />
          <Stack
            screenOptions={{
              headerShown: false,
              statusBarColor: Colors.django.primary,
            }}
          >
            <Stack.Screen name="index" />
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
              }}
            />
            <Stack.Screen name="(auth)" options={{}} />
            <Stack.Screen name="(tabs)" options={{}} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>
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
