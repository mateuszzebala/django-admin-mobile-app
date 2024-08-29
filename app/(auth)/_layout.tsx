import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar hidden={false} backgroundColor={Colors.django.primary} />
        <Stack
          screenOptions={{
            statusBarColor: Colors.django.primary,
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen
            name="connect"
            options={{
              headerStyle: {
                backgroundColor: Colors.django.primary,
              },
              headerTintColor: Colors.background,
              headerTitle: "Connect",
              headerShown: true,
              animationDuration: 2000,
              headerTitleStyle: {
                fontWeight: "bold",
                color: Colors.background,
              },
            }}
          />
          <Stack.Screen
            name="connections"
            options={{
              headerStyle: {
                backgroundColor: Colors.django.primary,
              },
              headerTintColor: Colors.background,
              headerBackTitle: "Connections",
              headerTitle: "Connections",
              headerShown: true,
              animationDuration: 2000,
              headerTitleStyle: {
                fontWeight: "bold",
                color: Colors.background,
              },
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
